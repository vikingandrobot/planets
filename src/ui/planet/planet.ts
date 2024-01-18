import { Planet } from "@simulation/model/planet";
import { Renderer } from "../renderer/renderer";

export function draw(
  ctx: CanvasRenderingContext2D,
  renderer: Renderer,
  planet: Planet
) {
  const [x, y] = renderer.getPositionFromRealWordToPixels(planet.pos);
  const [waterGradientX, waterGradientY] =
    renderer.getPositionFromRealWordToPixels([
      planet.pos[0] - planet.radius * 0.7,
      planet.pos[1] + planet.radius * 0.7,
      planet.pos[2],
    ]);
  const [radius] = renderer.getSizeFromRealWordToPixels(
    [planet.radius, planet.radius],
    planet.pos
  );
  const [waterMinRadius] = renderer.getSizeFromRealWordToPixels(
    [planet.radius / 4, planet.radius / 4],
    planet.pos
  );
  const [waterMaxRadius] = renderer.getSizeFromRealWordToPixels(
    [planet.radius * 1.5, planet.radius * 1.5],
    planet.pos
  );
  const [haloRadius] = renderer.getSizeFromRealWordToPixels(
    [planet.radius + 500, planet.radius + 500],
    planet.pos
  );

  if (
    radius < 1 ||
    waterMinRadius < 1 ||
    waterMaxRadius < 1 ||
    haloRadius < 1
  ) {
    return;
  }

  const grdHalo = ctx.createRadialGradient(
    x,
    y,
    haloRadius / 2,
    x,
    y,
    haloRadius
  );
  grdHalo.addColorStop(0.9, "white");
  grdHalo.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.beginPath();
  ctx.fillStyle = grdHalo;
  ctx.arc(x, y, haloRadius, 0, 360);
  ctx.fill();
  ctx.closePath();

  const grd = ctx.createRadialGradient(
    waterGradientX,
    waterGradientY,
    waterMinRadius,
    waterGradientX,
    waterGradientY,
    waterMaxRadius
  );
  grd.addColorStop(0, "white");
  grd.addColorStop(0.5, "#95d1ed");
  grd.addColorStop(1, planet.color ?? "#345d70");

  ctx.beginPath();
  ctx.fillStyle = grd;
  ctx.arc(x, y, radius, 0, 360);
  ctx.fill();
  ctx.closePath();
}
