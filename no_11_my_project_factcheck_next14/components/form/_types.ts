export interface SelectList<T = any> {
    key: T;
    label: string;
}


export interface RadioList<T = any> {
    label: string;
    value: T,
    key?: string;
    submitApi?: (...arg: any[]) => Promise<any>;
}