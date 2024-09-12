import { VIDEO_LOAD_COMPLETE } from "./types";

export const videoLoadComplete = () => {
  return {
    type: VIDEO_LOAD_COMPLETE,
  }
}


export interface CommonAction {
  type: typeof VIDEO_LOAD_COMPLETE;
}