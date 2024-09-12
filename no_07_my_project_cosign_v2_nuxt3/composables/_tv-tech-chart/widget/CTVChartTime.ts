import type { VisibleTimeRange } from "~/public/charting_library/charting_library";
import type { EInterval } from "../_types";
import { getMinuteValueByInterval } from "../common";
import type { CTVChart } from "./CTVChart";


export class CTVChartTime {
    private chart: CTVChart;
    constructor(chart: CTVChart) {
        this.chart = chart;
    }

    public getVisibleCandleCount(interval: EInterval): number {
        const {from, to} = this.chart.getVisibleTimeRange();
        const minuteValue = getMinuteValueByInterval(interval);
        return (to - from) / minuteValue / 60;
    }

    public getTimeRangeByCenterSeconds(centerSeconds: number): VisibleTimeRange {
        const {from, to} = this.chart.getVisibleTimeRange();
        const timeDiff = to - from;

        return {
            from: centerSeconds - timeDiff/2,
            to: centerSeconds + timeDiff/2,
        }
    }

    /**
     * @param targetVisibleRange 현재 확대 비율보다 작을 경우 => 현재 확대 비율 유지
     * @param targetVisibleRange 현재 확대 비율보다 클 경우 => 확대
     * @returns 
     */
    public getOnlyZoomInByTimeRange(targetVisibleRange: VisibleTimeRange): VisibleTimeRange {
        const currentVisibleRange = this.chart.getVisibleTimeRange();

        const diffSecondsSmallerThanCurrent = (currentVisibleRange.to - currentVisibleRange.from) - (targetVisibleRange.to - targetVisibleRange.from);
        if(diffSecondsSmallerThanCurrent > 0) {
            // 패턴이 현재 차트 화면보다 작다 => 현재 해상도 유지
            const paddingSeconds = diffSecondsSmallerThanCurrent / 2;

            return {
                from: targetVisibleRange.from - paddingSeconds,
                to: targetVisibleRange.to + paddingSeconds,
            }
        } else {
            // 파라미터 범위의 10%의 여백을 둔다
            const paddingSeconds = (targetVisibleRange.to - targetVisibleRange.from) * 0.1;
            
            return {
                from: targetVisibleRange.from - paddingSeconds,
                to: targetVisibleRange.to + paddingSeconds,
            }
        }
    }
}