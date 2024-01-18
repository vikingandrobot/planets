import { Position, Size } from "../../simulation/model/types";
import { Camera } from "./camera";

export class Renderer {
  private camera: Camera;

  constructor(camera: Camera) {
    this.camera = camera;
  }

  getCamera(): Camera {
    return this.camera;
  }

  getPositionFromRealWordToPixels(pos: Position): Position {
    const f = this.camera.focalLength;
    const viewportCenterX = this.camera.viewportSize[0] / 2;
    const viewportCenterY = this.camera.viewportSize[1] / 2;
    const [x, y, z] = pos;
    const [xc, yc, zc] = this.camera.pos;

    if (z < zc) {
      return [-10000, -10000, 0];
    }

    const xa = (f * (x - xc)) / (z - zc + f) + viewportCenterX;
    const ya = viewportCenterY - (f * (y - yc)) / (z - zc + f);

    return [xa, ya, 0];
  }

  getSizeFromRealWordToPixels([width, height]: Size, pos: Position): Size {
    const f = this.camera.focalLength;
    const viewportCenterX = this.camera.viewportSize[0] / 2;
    const viewportCenterY = this.camera.viewportSize[1] / 2;
    const [x1, y1, z] = pos;
    const [xc, yc, zc] = this.camera.pos;

    const x = x1 + width;
    const y = y1 * height;

    if (z < zc) {
      return [0, 0];
    }

    const xa = (f * (x1 - xc)) / (z - zc + f) + viewportCenterX;
    const ya = viewportCenterY - (f * (y1 - yc)) / (z - zc + f);

    const xw = (f * (x - xc)) / (z - zc + f) + viewportCenterX;
    const yh = viewportCenterY - (f * (y - yc)) / (z - zc + f);

    return [Math.abs(xa - xw), Math.abs(yh - ya)];
  }
}
