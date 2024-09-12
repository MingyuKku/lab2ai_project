import { VIDEO_LOAD_COMPLETE } from "./types";
import { CommonAction } from './actions';

interface CommonState {
    isVideoLoading: boolean;
}

const initState:CommonState = {
    isVideoLoading: false,
}

const commonReducer = (state:CommonState = initState, action:CommonAction):CommonState => {
  switch (action.type) {
    case VIDEO_LOAD_COMPLETE:
      // const { body } = document;
      // if (body) body.style.overflow = 'visible';

      return {
        ...state,
        isVideoLoading: true,
      };
    default:
      return state;
  }
}

export default commonReducer;