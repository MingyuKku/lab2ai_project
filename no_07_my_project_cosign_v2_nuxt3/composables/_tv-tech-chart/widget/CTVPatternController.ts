import type { IPatternGraph } from "~/composables/coin/tv-tech-chart/services/_types";
import { CTVPattern } from "../elements/CTVPattern";
import type { CTVChart } from "./CTVChart";
import { getTimeStampByPointTime } from "../common";
import { CTVChartTime } from "./CTVChartTime";


export class CTVPatternController {
    private ctvChart: CTVChart;
    private patterns: CTVPattern[] = [];
    private isVisible: boolean = false;

    constructor(ctvChart: CTVChart) {
        this.ctvChart = ctvChart;
    }

    public add(patternGraphs: IPatternGraph[]) {
        const currentIds = this.patterns.map((pattern) => pattern.getPatternScanId());

        const addPatterns = patternGraphs.filter((pattern) => !currentIds.includes(pattern.patternScanId))
                                    .map((pattern) => new CTVPattern(
                                        pattern.patternScanId,
                                        pattern.patternType,
                                        pattern.points,
                                        getTimeStampByPointTime(pattern.startPointTime),
                                        getTimeStampByPointTime(pattern.endPointTime),
                                    ))
                            ;

        this.patterns = [...this.patterns, ...addPatterns];
    }

    public show(): void {
        this.patterns.forEach((pattern) => {
            pattern.show(this.ctvChart);
        })
    }

    public hide(): void {
        this.patterns.forEach((pattern) => {
            pattern.hide(this.ctvChart);
        });
    }

    public moveByPatternId(patternScanId: number) {
        const pattern = this.patterns.filter((pattern) => pattern.getPatternScanId() === patternScanId)[0];

        if(pattern) {
            const ctvChartTime = new CTVChartTime(this.ctvChart);
            const targetTimeRange = ctvChartTime.getOnlyZoomInByTimeRange({
                from: pattern.getStartSeconds(),
                to: pattern.getEndSeconds(),
            })
        }
    }

}