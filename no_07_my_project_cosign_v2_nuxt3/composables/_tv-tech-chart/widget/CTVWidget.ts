import type { ChartPropertiesOverrides, ChartingLibraryWidgetOptions, IChartWidgetApi, IChartingLibraryWidget, TradingTerminalWidgetOptions } from "~/public/charting_library/charting_library";
import type { TInterval } from "../_types";
import { defaultOption, features_options, loadOptions, overrides } from "../widgetOptions";
import { COLOR_CHART_BG, POSITION_LINE_FONT_SIZE, PRICE_SCALE_FONT_SIZE, createChartReadyPromise } from "../common";
import { CTVChart } from "./CTVChart";


export class CTVWidget {
    private widget: IChartingLibraryWidget;
    constructor(cryptoId: number, interval: TInterval, container: HTMLElement, datafeedUrl?: string) {
        this.widget = this.create(cryptoId, interval, container, datafeedUrl);
    }

    public getChart(): Promise<CTVChart> {
        return createChartReadyPromise<CTVChart>(async (chart) => {
            return new CTVChart(chart);
        }, this.widget);
    }

    private create(cryptoId: number, interval: TInterval, container: HTMLElement, datafeedUrl?: string): IChartingLibraryWidget {
        if(datafeedUrl === undefined) {
            const config = useRuntimeConfig();
            datafeedUrl = `${config.public.CONTENT_API_URL}/chart`;
        }
    
        const widgetOptions: ChartingLibraryWidgetOptions | TradingTerminalWidgetOptions = {
            datafeed: new window.Datafeeds.UDFCompatibleDatafeed(datafeedUrl),
            container: container,
            symbol: `${cryptoId}`,
            interval,
            ...defaultOption,
            ...loadOptions as any,
            ...features_options,
            ...overrides,
        }
    
        const { $widget } = useNuxtApp();
        const widget = new $widget(widgetOptions);
    
        const option: Partial<ChartPropertiesOverrides> = {
            "paneProperties.background": COLOR_CHART_BG,
            "paneProperties.vertGridProperties.color": COLOR_CHART_BG,
            "paneProperties.horzGridProperties.color": COLOR_CHART_BG,
    
            "scalesProperties.fontSize": PRICE_SCALE_FONT_SIZE,
            'scalesProperties.showSeriesLastValue': true,
            'scalesProperties.showStudyLastValue': false,
    
            'linetoolposition.bodyFontBold': true,
            'linetoolposition.quantityFontBold': true,
            'linetoolposition.bodyFontFamily': 'SpoqaHanSansNeo',
            'linetoolposition.quantityFontFamily': 'SpoqaHanSansNeo',
            'linetoolposition.bodyFontSize': POSITION_LINE_FONT_SIZE,
            'linetoolposition.quantityFontSize': POSITION_LINE_FONT_SIZE,
            'linetoolposition.showDateTimeRange': true,
        }
    
        widget.applyOverrides(option);
    
        return widget;
    }
}