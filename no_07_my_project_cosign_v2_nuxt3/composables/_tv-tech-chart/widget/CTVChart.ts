import type { MultipointShape } from "~/composables/coin/tv-tech-chart/services/_types";
import type { EntityId, IChartWidgetApi, ResolutionString, VisibleTimeRange } from "~/public/charting_library/charting_library";
import type { EInterval } from "../_types";
import { CTVChartTime } from "./CTVChartTime";


export class CTVChart {
    private chart: IChartWidgetApi;
    constructor(chart: IChartWidgetApi) {
        this.chart = chart;
    }

    public getSymbol(): number {
        return parseInt(this.chart.symbol());
    }

    public async setSymbol(symbolId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.chart.setSymbol(
                symbolId + '',
                {
                    dataReady: () => {
                        resolve();
                    }
                }
            );
        });
    }

    public getVisibleTimeRange(): VisibleTimeRange {
        return this.chart.getVisibleRange();
    }

    public setVisibleTimeRange(visibleTimeRange: VisibleTimeRange): Promise<void> {
        return this.chart.setVisibleRange(visibleTimeRange);
    }

    public createMultipointShapes(shapes: MultipointShape[]): EntityId[]  {
        const entityIds = shapes.map((shape) => {
            return this.chart.createMultipointShape(shape.points, shape.options);
        }).filter(entityId => entityId) as EntityId[];

        return entityIds;
    }

    public removeShapes (entityIds: EntityId[]): void {
        entityIds.filter((entityId) => {
            this.chart.removeEntity(entityId);
        })
    }

    public subscribe(onVisibleRangeChanged: (range: VisibleTimeRange) => void): void {
        this.chart.onVisibleRangeChanged().subscribe(null, onVisibleRangeChanged)
    }

    public async setInterval(interval: EInterval): Promise<void> {
        return new Promise((resolve, reject) => {
            this.chart.setResolution(
                interval as ResolutionString,
                {
                    dataReady: () => {
                        resolve();
                    }
                }
            );
        })
    }
}