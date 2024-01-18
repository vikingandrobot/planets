import { Planet } from "@simulation/model/planet";
import { Renderer, distanceFromTwoPoints } from "../renderer/renderer";

export function draw(
  ctx: CanvasRenderingContext2D,
  renderer: Renderer,
  planet: Planet
) {
  const a = renderer.getPositionFromRealWordToPixels(planet.pos);
  const b =
    [
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] + Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[1] + Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[2],
      ]),
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] - Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[1] - Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[2],
      ]),
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] - Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[1] + Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[2],
      ]),
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] + Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[1] - Math.sin(Math.PI / 4) * planet.radius,
        planet.pos[2],
      ]),
    ].find((b) => !!b) ?? null;
  const c =
    [
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] - Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[1] + Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[2],
      ]),
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] - Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[1] - Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[2],
      ]),
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] + Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[1] + Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[2],
      ]),
      renderer.getPositionFromRealWordToPixels([
        planet.pos[0] - Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[1] - Math.sin(Math.PI / 4) * planet.radius * 0.7,
        planet.pos[2],
      ]),
    ].find((c) => !!c) ?? null;

  if (!a || !b || !c) {
    return;
  }

  const [x, y] = a;
  const [xWithRadius, yWithRadius] = b;
  const [waterGradientX, waterGradientY] = c;

  const radius = distanceFromTwoPoints([x, y], [xWithRadius, yWithRadius]);
  const waterRadius = distanceFromTwoPoints(
    [x, y],
    [waterGradientX, waterGradientY]
  );
  const waterMinRadius = radius / 4;
  const waterMaxRadius = radius * 1.5;
  const haloRadius = radius * 1.01;

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
    x - waterRadius,
    y - waterRadius,
    waterMinRadius,
    x - waterRadius,
    y - waterRadius,
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
