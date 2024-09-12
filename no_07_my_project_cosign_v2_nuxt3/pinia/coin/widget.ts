import { defineStore } from 'pinia';
import type { IChartingLibraryWidget, ResolutionString, EntityId } from '@/public/charting_library/charting_library';
import { useCoinPattern } from './pattern';
import type { VisibleTimeRange } from '~/public/charting_library/charting_library.d';
import { drawPatternDetail } from '~~/composables/coin/pattern';
import { useTabContentUI } from './tabcontentui';
import { buildChart } from '~~/composables/coin/chartBuilder';
import { useRecentReport, useReport } from '~~/composables/coin/report';
import { PatternScanClass, type Points, getScanIdPatternScan } from '~~/composables/coin/patterns/statistics';


export interface IntervalButton {
    text: string;
    interval: ResolutionString;
}

const intervals: string[] = [
    // '1분', '5분', '15분', '1시간', '4시간', '1일', '7일', '30일',
    // '1', '5', '15', '1H', '4H', '1D', '7D', '30D' 
    '15', '1H', '4H', '1D', '7D'
]

export const getParamsIntervals = (intervals: string) => {
    if (intervals === '15') return '15';
    else if (intervals === '1H') return '60';
    else if (intervals === '4H') return '240';
    else if (intervals === '1D') return '1440';
    else if (intervals === '7D') return '10080';
    else return '15';
}

const getIntervalText = (interval: string) => {
  if(interval.includes('H')) {
    return interval.replace('H', '시간');
  } else if(interval.includes('D')) {
    return interval.replace('D', '일');
  } else {
    return interval + '분';
  }
}

export interface WidgetValue {
    interval: ResolutionString | null;
    report: string | null;
}

export const useCoinWidget = defineStore('coinWidget', () => {

    interface WidgetController {
        widget: IChartingLibraryWidget | null,
        chartContainer: HTMLElement | null,
        symbol: string | null,
        digitalAssetsCode: string | null;
        active: boolean,
    } 

    const controller = reactive<WidgetController>({
        widget: null,
        chartContainer: null,
        symbol: null,
        digitalAssetsCode: null,
        active: true, // 첫 탭이 차트 분석이기에
    })

    const widgetValue = reactive<WidgetValue>({
        interval: null,
        report: null
    })

    let tvChartInterval = reactive<{
        loadRecentPattern:NodeJS.Timeout | null
    }>({
        loadRecentPattern: null
    });

    const clearPatternStatistics = () => {
        const { patternStatistics, setPatternButtons, setStatisticsActiveItem } = useCoinPattern();
        if (patternStatistics.lastRequestTimeout) clearTimeout(patternStatistics.lastRequestTimeout);
        setPatternButtons([]); // 버튼 초기화
        setStatisticsActiveItem(null); // 활성화된 통계 아이템 초기화
    }

    const clearWidget = () => {
        if (controller.widget !== null) controller.widget.remove();
        controller.widget = null;
        controller.chartContainer = null;
        controller.symbol = null;
        controller.digitalAssetsCode = null;
        widgetValue.report = null;
        if (tvChartInterval.loadRecentPattern) clearInterval(tvChartInterval.loadRecentPattern);

        clearPatternStatistics();
    }

    const intervalButtons: IntervalButton[] = intervals.map(interval => ({interval: interval as ResolutionString, text: getIntervalText(interval)}))

    widgetValue.interval = intervalButtons[0].interval;

    const setControllerDigitalAssetsCode = (digitalAssetsCode: string) => {
        controller.digitalAssetsCode = digitalAssetsCode;
    }

    const { updateElementHeight } = useTabContentUI();

    const initChartWidget = (symbol: string, interval: ResolutionString, chartContainer: HTMLElement): IChartingLibraryWidget => {
        const widget = buildChart(symbol, interval, chartContainer);
        controller.widget = widget;
        controller.chartContainer = chartContainer;
        controller.symbol = symbol;
        widgetValue.interval = interval;

        const {
            onVisibleRangeChanged, 
            // loadRecentPattern
        } = useCoinPattern();

        widget.onChartReady(() => {
            widget.activeChart().onVisibleRangeChanged()
                .subscribe(null, async({from, to}) => {
                    if (controller.active) {
                        onVisibleRangeChanged(controller.symbol!, from, to, widgetValue.interval!)
                    }
                });
            
            // if (tvChartInterval.loadRecentPattern) clearInterval(tvChartInterval.loadRecentPattern);
            // tvChartInterval.loadRecentPattern = setInterval(async () => {
            //     if (controller.active) {
            //         loadRecentPattern(controller.symbol, widgetValue.interval);
            //     }
            // }, 10000)
        })

        // loadRecentReport(controller.symbol, widgetValue.interval);
        
        return widget;
    }

    // const loadRecentReport = async (symbol: string, interval: ResolutionString) => {
    //     widgetValue.report = await useRecentReport(symbol, interval);

    //     await nextTick();
    //     updateElementHeight();
    // }

    // const loadReport = async () => {
    //     if (controller.widget) {
    //         const visibleRange = controller.widget.activeChart().getVisibleRange();

    //         widgetValue.report = await useReport(visibleRange, controller.digitalAssetsCode);

    //         await nextTick();
    //         updateElementHeight();
    //     }
    // }

    const initChart = (symbol: string | null, chartContainer: HTMLElement | null) => {
        if (!symbol || !chartContainer || !widgetValue.interval) return;
        initChartWidget(symbol, widgetValue.interval, chartContainer);
    }

    const initPatternChart = async (symbol: string, patternId: string, chartContainer: HTMLElement) => {
        const { movePathPattern } = useCoinPattern();

        // const term7day = 63676800; // 해당 패턴의 분봉을 알 수 없기에 가장 긴 7일 봉을 기준으로 범위를 잡음
        const windowCandleCount = 70;
        // const res = await getPatternScanIdStatistics('6', term7day);
        const res = await getScanIdPatternScan(patternId, windowCandleCount * 2);
        if (res) {
            const { patternGraphItems, patternStatisticsItem } = new PatternScanClass(res);

            if (patternStatisticsItem) {
                const interval = patternStatisticsItem.interval as ResolutionString;
                widgetValue.interval = interval;
                const widget = initChartWidget(symbol, widgetValue.interval, chartContainer);

                if (patternStatisticsItem) {
                    widget.onChartReady(() => {
                        movePathPattern(patternGraphItems, patternStatisticsItem)       
                    })
                }
            }
            
        } else {
            if (widgetValue.interval) initChartWidget(symbol, widgetValue.interval, chartContainer);
        }
    }

    const removeEntities = (shapeIds: EntityId[]) => {
        if (controller.widget) {
            for (const shapeId of shapeIds) {
                controller.widget.activeChart().removeEntity(shapeId);
            }
        }
    }

    const drawPattern = (patternCode: string | null, points: Points[], auxPoints: Points[]): EntityId[] => {
        if (!patternCode) return [];

        if (controller.active && controller.widget) {
            return drawPatternDetail(controller.widget.activeChart(), patternCode, points, auxPoints);
        } else {
            return [];
        }
    }

    const setVisibleRange = (from: number, to: number) => {
        if (controller.widget) {
            controller.widget.activeChart().setVisibleRange(
                {
                    from, to
                },
                {
                    applyDefaultRightMargin: false
                }
            )
        }
    }

    const setChartInterval = (interval: ResolutionString) => {
        const { clearItems } = useCoinPattern();
        widgetValue.interval = interval;
        clearItems();

        initChart(controller.symbol, controller.chartContainer)
    }

    const setChartSymbol = (symbol: string) => {
        const { clearItems } = useCoinPattern();
        clearItems();

        initChart(symbol, controller.chartContainer)
    }

    const setActive = (active: boolean) => {
        const { showAllPatterns, hideAllPatterns, activateTab, updatePatternScan } = useCoinPattern();
        controller.active = active;
        if (active) {
            if (controller.widget) {
                // 삭제했던 모든 패턴 재추가
                controller.widget.onChartReady(() => {
                    try {
                        const range: VisibleTimeRange = controller.widget!.activeChart().getVisibleRange();
                        updatePatternScan(controller.symbol, range.from, range.to, widgetValue.interval);
                        // showAllPatterns(range.from, range.to);
                        
                        const activeChart = controller.widget!.activeChart();
                        // activateTab(controller.symbol, activeChart.getVisibleRange().from, widgetValue.interval);
                    } catch (ex) {
                        // 라이브러리 에러 발생으로 인해 다른 함수 실행에 지장이 생기며, 파악은 되지 않지만 기능 실행에 지장이 없이 try-catch처리만 진행함
                    }
                })
            }
            

        } else {
            // 모든 패턴 삭제
            hideAllPatterns();
        }
    }

    const getController = computed(() => controller);

    onBeforeUnmount(() => {
        if (tvChartInterval.loadRecentPattern) clearInterval(tvChartInterval.loadRecentPattern);
    })

    return {
        initChart,
        controller,
        setControllerDigitalAssetsCode,
        removeEntities,
        drawPattern,
        setVisibleRange,
        setChartInterval,
        setChartSymbol,
        intervalButtons,
        widgetValue,
        setActive,
        // loadReport,
        initPatternChart,
        getController,
        tvChartInterval,
        clearWidget
    }
})