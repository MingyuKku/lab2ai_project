import { SET_INTERSECT_ELEMENT, SET_INTERSECTING } from "./types"

export const setIntersectDomElement = (elements: {name: string; el: HTMLElement;}[]) => {
  return {
    type: SET_INTERSECT_ELEMENT,
    elements
  }
}

export const setIntersecting = (element: {name: string; el: HTMLElement | null;}) => {
  return {
    type: SET_INTERSECTING,
    element
  }
} 


export interface SetIntersectDomElement {
  type: typeof SET_INTERSECT_ELEMENT;
  elements: {name: string; el: HTMLElement;}[];
}

export interface SetIntersecting {
  type: typeof SET_INTERSECTING;
  element: {name: string; el: HTMLElement | null;};
}