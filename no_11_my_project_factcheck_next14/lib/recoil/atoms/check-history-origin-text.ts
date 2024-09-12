import { atom } from "recoil";
import { CheckHistoryOriginText } from "./_types";

export const checkHistoryState = atom<CheckHistoryOriginText[]>({
    key: 'checkHistoryOriginText',
    default: [],
})