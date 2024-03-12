import { Square } from "../classes/Square";
import { PiecesType } from "../models";
import { crossedSquares } from "./crossedSquares";

export const isValidMove = (
  board: Square[],
  firstSquare: Square,
  lastSquare: Square
) => {
  if (firstSquare.squareId === lastSquare.squareId) {
    return false;
  }
  let middleSquares = crossedSquares(board, firstSquare, lastSquare);
  return true
};
