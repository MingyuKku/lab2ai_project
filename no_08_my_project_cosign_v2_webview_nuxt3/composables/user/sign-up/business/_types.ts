export interface SignupInputs {
    nickname: InputData;
    email: InputData;
    password: InputData;
    passwordCheck: InputData;
}

export interface InputData {
    id: string;
    value: any;
    label?: string;
    placeholder?: string;
    tips?: string;
    errors?: SignupInputerrors;
    setValue: (value: any) => void;
    disabled?: boolean;
}

export interface SignupInputerrors {
    [key: string]: SignupInputerror | undefined;
    rule: SignupInputerror;
    inUse?: SignupInputerror;
}

interface SignupInputerror {
    label: string;
    flag: boolean;
}


export const CheckItemNames = [ 'age', 'service', 'private', 'event' ] as const;

export type CheckItemNamesType = typeof CheckItemNames[number];
export interface SignupAgreeList {
    items: {
        name: CheckItemNamesType;
        label: string;
        flag: boolean;
        required: boolean;
        href?: string;
    }[];
    checkedItems: CheckItemNamesType[];
}