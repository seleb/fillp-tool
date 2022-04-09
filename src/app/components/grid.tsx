import { h } from "preact";
import { useEffect, useLayoutEffect, useMemo, useRef } from "preact/hooks";
import "./grid.css";
import coloursHex from "./colours";
import Draw1Bit from "draw-1-bit";

const width = 4;
const height = 4;

export default function Grid({
  bits = {},
  tileX = 1,
  tileY = 1,
  onChange,
  colours,
}) {
  const refDraw = useRef();
  const refContainer = useRef();
  const [colorBg, colorFill] = useMemo(
    () => [coloursHex[colours[0]], coloursHex[colours[1]]],
    [colours]
  );
  useLayoutEffect(() => {
    refDraw.current = new Draw1Bit({
      width: width * tileX,
      height: height * tileY,
      colorBg,
      colorFill,
    });
  }, []);
  useLayoutEffect(() => {
    const container = refContainer.current;
    if (!container) return;
    container.appendChild(refDraw.current.canvas);
  }, []);
  useLayoutEffect(() => {
    refDraw.current.colorBg = colorBg;
    refDraw.current.render();
  }, [colorBg]);
  useLayoutEffect(() => {
    refDraw.current.colorFill = colorFill;
    refDraw.current.render();
  }, [colorFill]);
  useEffect(() => {
    function onInput(event) {
      onChange(
        2 **
          (width * height -
            1 -
            ((event.detail.x % width) + (event.detail.y % height) * width))
      );
    }
    refDraw.current.addEventListener("draw", onInput);
    return () => {
      refDraw.current.removeEventListener("draw", onInput);
    };
  }, [onChange]);
  useLayoutEffect(() => {
    Object.values(bits).forEach((on, idx, a) => {
      idx = a.length - idx - 1;
      for (let x = 0; x < tileX; ++x) {
        for (let y = 0; y < tileY; ++y) {
          refDraw.current.fill(
            (idx % width) + x * width,
            Math.floor(idx / width) + y * height,
            on
          );
        }
      }
    });
    refDraw.current.render();
  }, [bits]);

  return <div ref={refContainer} class="grid" />;
}
