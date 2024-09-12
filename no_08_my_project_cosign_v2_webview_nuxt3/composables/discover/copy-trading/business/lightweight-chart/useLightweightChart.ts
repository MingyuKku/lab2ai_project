import type { BaselineStyleOptions, DeepPartial, IChartApi, ISeriesApi, LineData, SeriesOptionsCommon, Time } from "lightweight-charts";
import chartConfig from './options';
import type { ChartPointList } from "../../service/_types";

export const useLightweightChart = () => {
    const chartDomRef = ref<HTMLDivElement>();
    const chartRef = ref<IChartApi | null>(null);
    // const areaSeriesRef = ref<ISeriesApi<"Area", Time> | null>(null);
    const areaSeriesRef = ref<ISeriesApi<"Baseline", Time> | null>(null);

    const chartData = ref<LineData[]>([]);
    let topValue: number | null = null;

    // const addAreaSeries = (): AreaSeriesPartialOptions => {
    //     return {
    //         lineColor: '#00B287',
    //         lineWidth: 1,
    //         crosshairMarkerVisible: false,
    //         priceLineVisible: false,
    //     }
    // }
    const addAreaSeries = (): DeepPartial<BaselineStyleOptions & SeriesOptionsCommon> | undefined => {
        return {
            baseValue: {
                type: 'price',
                price: 0
            },
            topLineColor: 'rgba(0,178,135, 1)',
            topFillColor1: 'rgba(0,178,135, 0.05)',
            baseLineColor: 'rgba(243,71,93, 1)',
            bottomFillColor1: 'rgba(243,71,93, 0.05)',
            lineWidth: 1,
            lineType: 2,
            crosshairMarkerVisible: false,
            priceLineVisible: false,
        }
    }

    const initData = (pointList: ChartPointList[], topROI: number) => {
        const newData = pointList.map((point) => ({
            'time': point.timestamp,
            'value': point.roi,
        })) as LineData[];

        topValue = topROI;

        chartData.value = newData;
    }

    const createChart = (): IChartApi | null => {
        if (!chartDomRef.value) return null;
    
        const { $lightweight } = useNuxtApp();
        
        const chart = $lightweight(chartDomRef.value, {
            width: chartDomRef.value.offsetWidth,
            height: 70,
            ...chartConfig,
        });
        chartRef.value = chart;
        return chart;
    }


    const priceScaleRange = () => {
        if (!chartData.value || !areaSeriesRef.value || topValue === null) return;

        let high = Number.MIN_SAFE_INTEGER;
        let low = Number.MAX_SAFE_INTEGER;
        
        chartData.value.forEach(data => {
            high = Math.max(data.value, high);
            low = Math.min(data.value, low);
        })
        high = Math.max(high, topValue);

        areaSeriesRef.value.applyOptions({
            autoscaleInfoProvider: () => ({
                priceRange: {
                    maxValue: high,
                    minValue: low,
                },
            })
        })
    }


    const drawChart = () => {
        if (!chartRef.value) return;

        // const areaSeries = chartRef.value.addAreaSeries(addAreaSeries());
        const areaSeries = chartRef.value.addBaselineSeries(addAreaSeries());
        areaSeriesRef.value = areaSeries;
    
        areaSeries.setData(chartData.value);

        createPriceLine();
        priceScaleRange();
        
        chartRef.value.timeScale().fitContent();
    }


    const createPriceLine = () => {
        if (!areaSeriesRef.value || topValue === null) return;

        areaSeriesRef.value.createPriceLine({
            title: `${topValue.truncateDecimal(100)}%`,
            price: topValue,
            color: '#929AA5',
            lineWidth: 1,
            lineStyle: 3, // LineStyle.Dashed
            axisLabelVisible: true,
            axisLabelColor: '#FFF',
            axisLabelTextColor: '#707A8A',
        });
    }

    return {
        chartDomRef,
        chartRef,
        initData,
        createChart,
        drawChart,
        createPriceLine,
    }
}