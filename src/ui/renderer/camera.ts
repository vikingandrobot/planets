import { Position, Size } from "../../simulation/model/types";

export class Camera {
  pos: Position;
  size: Size;
  focalLength: number = 500;

  get viewportSize(): Size {
    const ratio = this.size[1] / this.size[0];
    return [this.viewportWidth, Math.round(this.viewportWidth * ratio)];
  }

  private canvas: HTMLCanvasElement;
  private viewportWidth: number;

  constructor(
    pos: Position,
    size: Size,
    viewportWidth: number,
    canvas: HTMLCanvasElement
  ) {
    this.pos = [...pos];
    this.size = [...size];
    this.viewportWidth = viewportWidth;
    this.canvas = canvas;
  }

  setViewportWidth(width: number) {
    this.viewportWidth = width;
    this.canvas.width = this.viewportSize[0];
    this.canvas.height = this.viewportSize[1];
  }

  centerCamera(pos: Position) {
    this.pos[0] = pos[0];
    this.pos[1] = pos[1];
  }
}
