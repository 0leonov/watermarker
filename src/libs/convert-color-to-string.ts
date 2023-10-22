import { RgbaColor } from "react-colorful";

export function convertColorToString(rgbaColor: RgbaColor) {
  return `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a})`;
}
