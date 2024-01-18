import assert from "node:assert";
import test, { describe, it } from "node:test";
import { Camera } from "./camera";

describe("Camera", () => {
  describe("viewportSize", () => {
    test("computes the viewport height based on the ratio of the camera", () => {
      const camera = new Camera([500, 500, 0], [800, 600], 400, {} as any);
      assert.deepEqual(camera.viewportSize, [400, 300]);
    });
  });
});
