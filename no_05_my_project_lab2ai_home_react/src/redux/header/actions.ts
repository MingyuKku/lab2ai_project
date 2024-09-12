import { HEADER_ACTIVE, HEADER_UNACTIVE } from "./types"

export const headerActive = () => {
  return {
    type: HEADER_ACTIVE,
  }
}

export const headerUnActive = () => {
  return {
    type: HEADER_UNACTIVE,
  }
}

export interface HeaderAction {
  type: typeof HEADER_ACTIVE | typeof HEADER_UNACTIVE;
}