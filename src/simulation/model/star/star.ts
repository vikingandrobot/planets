import { Position } from "../types";

export interface Star {
  pos: Position;
}

export function makeStar(pos: Position): Star {
  return {
    pos: [...pos],
  };
}
