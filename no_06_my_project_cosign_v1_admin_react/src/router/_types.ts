export type RoutesType = {
    name: string;
    index?: boolean;
    path?: string;
    element?: JSX.Element;
    children?: RoutesType[];
    title?: string;
}