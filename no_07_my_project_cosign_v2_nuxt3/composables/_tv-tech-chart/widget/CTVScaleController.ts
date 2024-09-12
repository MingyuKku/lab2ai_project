import type { CTVChart } from "./CTVChart";
import { CTVChartTime } from "./CTVChartTime";

export class CTVScaleController {
    private ctvChartTime: CTVChartTime;

    constructor(ctvChart: CTVChart) {
        this.ctvChartTime = new CTVChartTime(ctvChart);
    }

    
}