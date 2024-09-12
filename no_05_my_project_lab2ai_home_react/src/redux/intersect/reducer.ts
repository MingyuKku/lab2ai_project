import { SET_INTERSECT_ELEMENT, SET_INTERSECTING } from "./types";
import { SetIntersectDomElement, SetIntersecting } from './actions';

interface IntersectState {
  intersectDomElements: {
    name: string;
    el: HTMLElement | null;
  }[];
  activeIntersect: {
    name: string;
    el: HTMLElement | null;
  };
}

const initState:IntersectState = {
  intersectDomElements: [{
    name: '',
    el: null
  }],
  activeIntersect: {
    name: '',
    el: null
  }
}

const intersectReducer = (state:IntersectState = initState, action:SetIntersectDomElement | SetIntersecting):IntersectState => {
  switch (action.type) {
    case SET_INTERSECT_ELEMENT:
      return {
        ...state,
        intersectDomElements: state.intersectDomElements.concat(action.elements)
      }
    case SET_INTERSECTING:
      return {
        ...state,
        activeIntersect: {
          ...state.activeIntersect,
          name: action.element.name,
          el: action.element.el
        }
      }
    default:
      return state;
  }
}

export default intersectReducer;