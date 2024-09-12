import { BrowserWidth } from "./actions";
import { SET_WIDTH } from "./types";


const initState = 0;

const browserWidthReducer = (state:number = initState, action:BrowserWidth):number => {
  if (action.type === typeof SET_WIDTH) return action.width;
  return state;
}

export default browserWidthReducer;