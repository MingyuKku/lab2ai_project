import { HEADER_ACTIVE, HEADER_UNACTIVE } from "./types";
import { HeaderAction } from './actions';

interface HeaderState {
  isActive: boolean;
  height: number;
}

const initState:HeaderState = {
  isActive: false,
  height: 74,
}

const headerReducer = (state:HeaderState = initState, action:HeaderAction):HeaderState => {
  switch (action.type) {
    case HEADER_ACTIVE:
      return {
        ...state,
        isActive: true
      };
    case HEADER_UNACTIVE:
      return {
        ...state,
        isActive: false
      };
    default:
      return state;
  }
}

export default headerReducer;