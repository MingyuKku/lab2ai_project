export interface AlertState {
    flag: boolean;
    title: AlertTitle | null;
    description: AlertDescription | null;
    buttons: Alertbuttons | null;
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
    onClick?: (...arg: any[]) => any | void;
    type?: ButtonType;
    buttonColor?: string;
    labelColor?: string;
    borderColor?: string;
}

export type ButtonType = 'OK' | 'CANCLE';

export type SetAlertValueParams = {
    title?: AlertTitle;
    description?: AlertDescription;
    buttons?: Alertbuttons;
}



export type CheckHistoryOriginText = {
    id: number;
    text: string;
    isHighlight?: boolean;
}