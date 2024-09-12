import { atom } from "recoil";
import { AlertState } from "./_types";


export const alertState = atom<AlertState>({
    key: 'alertState',
    default: {
        flag: false,
        title: null,
        description: null,
        buttons: null,
    },
})