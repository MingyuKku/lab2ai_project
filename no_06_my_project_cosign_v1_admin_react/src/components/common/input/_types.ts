export type RadioName = string;
export interface RadioList<T = any> {
    id: string;
    label: string;
    value: T;
    isFocus?: boolean;
}
