import { AlertButtonHandlerKeys } from "hooks/_app/_types";

export interface AlertState {
    flag: boolean;
    title?: AlertTitle;
    description?: AlertDescription;
    buttons?: Alertbuttons;
}

export type AlertTitle = string | string[];
export type AlertDescription = string | string[];

export interface Alertbuttons {
    left?: Alertbutton;
    center?: Alertbutton;
    right?: Alertbutton;
}
interface Alertbutton {
    label?: string;
    // onClick?: (...arg: any[]) => any | void;
    onClickHandlerName?: AlertButtonHandlerKeys;
    type?: ButtonType;
    buttonColor?: string;
    labelColor?: string;
    borderColor?: string;
}

export type ButtonType = 'OK' | 'CANCLE';

