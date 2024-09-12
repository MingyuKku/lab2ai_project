import { SET_WIDTH } from "./types";

export const setWidth = (width:number) => {
  return {
    type: SET_WIDTH,
    width
  }
}

export interface BrowserWidth {
  type: typeof SET_WIDTH;
  width: number;
}