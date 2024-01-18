import { Star } from "@simulation/model/star";
import { Renderer } from "../renderer/renderer";

export function draw(
  ctx: CanvasRenderingContext2D,
  renderer: Renderer,
  stars: Star[]
) {
  for (let i = 0; i < stars.length; ++i) {
    const star = stars[i];

    const [x, y] = renderer.getPositionFromRealWordToPixels(star.pos);

    const [theoriticalWidth] = renderer.getSizeFromRealWordToPixels(
      [80000, 80000],
      star.pos
    );

    let w = theoriticalWidth;
    if (theoriticalWidth < 1) {
      w = 1;
    }

    ctx.beginPath();
    const starHalo = ctx.createRadialGradient(x, y, w, x, y, w * 5);
    starHalo.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    starHalo.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = starHalo;
    ctx.arc(x, y, w * 5, 0, 360);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(x, y, w, 0, 360);
    ctx.fill();
    ctx.closePath();
  }
}
