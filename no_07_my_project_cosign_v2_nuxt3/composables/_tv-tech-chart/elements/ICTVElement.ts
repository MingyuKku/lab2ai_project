import type { CTVChart } from "../widget/CTVChart";

export interface ICTVElement {
    show(ctvChart: CTVChart): void;
    hide(ctvChart: CTVChart): void;
}