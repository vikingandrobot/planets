import { Position } from "../types";

export interface Planet {
  pos: Position;
  /**
   * Meters
   */
  radius: number;

  color?: string;
}

export function makePlanet(
  pos: Position,
  radius: number,
  color?: string
): Planet {
  return {
    pos: [...pos],
    radius,
    color,
  };
}
