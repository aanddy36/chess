import { GRID_SIZE } from "../types/models";

export const checkXLimits = (
  divLimits: DOMRect,
  pieceXPos: number,
  offsetLeft: number
) => {
  const { x, width } = divLimits;
  const minX = x - offsetLeft;
  const maxX = minX + width;
  const cursorX = pieceXPos - GRID_SIZE / 2;
  if (cursorX < minX - GRID_SIZE / 2) {
    return minX - GRID_SIZE / 2;
  } else if (cursorX > maxX - GRID_SIZE / 2) {
    return maxX - GRID_SIZE / 2;
  } else {
    return cursorX;
  }
};

export const checkYLimits = (
  divLimits: DOMRect,
  pieceYPos: number,
  offsetTop: number
) => {
  const { y, height } = divLimits;
  const minY = y - offsetTop;
  const maxY = minY + height;
  const cursorY = pieceYPos - GRID_SIZE / 2;
  if (cursorY < minY - GRID_SIZE / 2) {
    return minY - GRID_SIZE / 2;
  } else if (cursorY > maxY - GRID_SIZE / 2) {
    return maxY - GRID_SIZE / 2;
  } else {
    return cursorY;
  }
};
