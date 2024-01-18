import { Position, Size } from "@simulation/model";
import assert from "node:assert";
import { hasUncaughtExceptionCaptureCallback } from "node:process";
import { describe, it } from "node:test";
import { Camera } from "./camera";
import { Renderer } from "./renderer";

describe.skip("Renderer", () => {
  const CAMERA_CENTER_IN_THE_SIMULATION: Position = [250, 560, 0];
  const CAMERA_BL_CORNER_IN_THE_SIMULATION: Position = [-150, 360, 0];
  const CAMERA_TL_CORNER_IN_THE_SIMULATION: Position = [-150, 760, 0];
  const CAMERA_BR_CORNER_IN_THE_SIMULATION: Position = [650, 360, 0];
  const CAMERA_TR_CORNER_IN_THE_SIMULATION: Position = [650, 760, 0];

  describe("The viewport is the same size as the simulation", () => {
    const camera = new Camera(
      CAMERA_CENTER_IN_THE_SIMULATION,
      [800, 400],
      800,
      {} as any
    );

    describe("getPositionFromRealWordToPixels()", () => {
      it("returns the center of the camera for a position in the center of the camera in the simulation", () => {
        const renderer = new Renderer(camera);

        const simulationPosition: Position = CAMERA_CENTER_IN_THE_SIMULATION;
        const viewPosition: Position | null =
          renderer.getPositionFromRealWordToPixels(simulationPosition);

        const expectedCameraCenterInViewport = [400, 200];

        assert.deepEqual(viewPosition, expectedCameraCenterInViewport);
      });

      it("returns the bottom left corner for a position in the bottom left corner of the camera in the simulation", () => {
        const renderer = new Renderer(camera);

        const simulationPosition: Position = CAMERA_BL_CORNER_IN_THE_SIMULATION;
        const viewPosition: Position | null =
          renderer.getPositionFromRealWordToPixels(simulationPosition);

        // In an HTML Canvas, the Y axis grows downwards, not upwards
        const expectedBottomLeftPosition = [0, 400];

        assert.deepEqual(viewPosition, expectedBottomLeftPosition);
      });

      it("returns the top left corner for a position in the top left corner of the camera in the simulation", () => {
        const renderer = new Renderer(camera);

        const simulationPosition: Position = CAMERA_TL_CORNER_IN_THE_SIMULATION;
        const viewPosition: Position | null =
          renderer.getPositionFromRealWordToPixels(simulationPosition);

        // In an HTML Canvas, the Y axis grows downwards, not upwards
        const expectedTopLeftPosition = [0, 0];

        assert.deepEqual(viewPosition, expectedTopLeftPosition);
      });

      it("returns the bottom right corner for a position in the bottom right corner of the camera in the simulation", () => {
        const renderer = new Renderer(camera);

        const simulationPosition: Position = CAMERA_BR_CORNER_IN_THE_SIMULATION;
        const viewPosition: Position | null =
          renderer.getPositionFromRealWordToPixels(simulationPosition);

        // In an HTML Canvas, the Y axis grows downwards, not upwards
        const expectedBottomRightPosition = [800, 400];

        assert.deepEqual(viewPosition, expectedBottomRightPosition);
      });

      it("returns the top right corner for a position in the top right corner of the camera in the simulation", () => {
        const renderer = new Renderer(camera);

        const simulationPosition: Position = CAMERA_TR_CORNER_IN_THE_SIMULATION;
        const viewPosition: Position | null =
          renderer.getPositionFromRealWordToPixels(simulationPosition);

        // In an HTML Canvas, the Y axis grows downwards, not upwards
        const expectedTopRightPosition = [800, 0];

        assert.deepEqual(viewPosition, expectedTopRightPosition);
      });

      it("returns a position outside of the viewport if a position is not visible in the camera", () => {
        const renderer = new Renderer(camera);

        const simulationPosition: Position = [-300, 800, 0];
        const viewPosition: Position | null =
          renderer.getPositionFromRealWordToPixels(simulationPosition);

        // In an HTML Canvas, the Y axis grows downwards, not upwards
        const expectedPosition = [-150, -40];

        assert.deepEqual(viewPosition, expectedPosition);
      });
    });
  });

  describe("The viewport does not have the same scale as the camera in the simulation", () => {
    const scaleRatio = 3 / 4;

    const camera = new Camera(
      CAMERA_CENTER_IN_THE_SIMULATION,
      [800, 400],
      Math.round(scaleRatio * 800),
      {} as any
    );

    it("returns the center of the camera for a position in the center of the camera in the simulation", () => {
      const renderer = new Renderer(camera);

      const simulationPosition: Position = CAMERA_CENTER_IN_THE_SIMULATION;
      const viewPosition: Position | null =
        renderer.getPositionFromRealWordToPixels(simulationPosition);

      const expectedCameraCenterInViewport = [300, 150];

      assert.deepEqual(viewPosition, expectedCameraCenterInViewport);
    });

    it("returns the bottom left corner for a position in the bottom left corner of the camera in the simulation", () => {
      const renderer = new Renderer(camera);

      const simulationPosition: Position = CAMERA_BL_CORNER_IN_THE_SIMULATION;
      const viewPosition: Position | null =
        renderer.getPositionFromRealWordToPixels(simulationPosition);

      // In an HTML Canvas, the Y axis grows downwards, not upwards
      const expectedBottomLeftPosition = [0, 300];

      assert.deepEqual(viewPosition, expectedBottomLeftPosition);
    });

    it("returns the top left corner for a position in the top left corner of the camera in the simulation", () => {
      const renderer = new Renderer(camera);

      const simulationPosition: Position = CAMERA_TL_CORNER_IN_THE_SIMULATION;
      const viewPosition: Position | null =
        renderer.getPositionFromRealWordToPixels(simulationPosition);

      // In an HTML Canvas, the Y axis grows downwards, not upwards
      const expectedTopLeftPosition = [0, 0];

      assert.deepEqual(viewPosition, expectedTopLeftPosition);
    });

    it("returns the bottom right corner for a position in the bottom right corner of the camera in the simulation", () => {
      const renderer = new Renderer(camera);

      const simulationPosition: Position = CAMERA_BR_CORNER_IN_THE_SIMULATION;
      const viewPosition: Position | null =
        renderer.getPositionFromRealWordToPixels(simulationPosition);

      // In an HTML Canvas, the Y axis grows downwards, not upwards
      const expectedBottomRightPosition = [600, 300];

      assert.deepEqual(viewPosition, expectedBottomRightPosition);
    });

    it("returns the top right corner for a position in the top right corner of the camera in the simulation", () => {
      const renderer = new Renderer(camera);

      const simulationPosition: Position = CAMERA_TR_CORNER_IN_THE_SIMULATION;
      const viewPosition: Position | null =
        renderer.getPositionFromRealWordToPixels(simulationPosition);

      // In an HTML Canvas, the Y axis grows downwards, not upwards
      const expectedTopRightPosition = [600, 0];

      assert.deepEqual(viewPosition, expectedTopRightPosition);
    });

    it("returns a position outside of the viewport if a position is not visible in the camera", () => {
      const renderer = new Renderer(camera);

      const simulationPosition: Position = [-300, 800, 0];
      const viewPosition: Position | null =
        renderer.getPositionFromRealWordToPixels(simulationPosition);

      // In an HTML Canvas, the Y axis grows downwards, not upwards
      const expectedPosition = [-112, -30];

      assert.deepEqual(viewPosition, expectedPosition);
    });
  });
});
