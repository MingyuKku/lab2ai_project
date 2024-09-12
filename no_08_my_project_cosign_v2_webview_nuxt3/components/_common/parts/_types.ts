export interface SelectedItems<T = any> {
    [key: string]: any;
    label: string;
    key: T;
}