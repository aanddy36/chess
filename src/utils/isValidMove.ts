import { Square } from "../classes/Square";
import { PiecesType } from "../models";
import { crossedSquares } from "./crossedSquares";

export const isValidMove = (
  board: Square[],
  firstSquare: Square,
  lastSquare: Square
) => {
  const { piece: firstPiece } = firstSquare;
  const { piece: lastPiece } = lastSquare;
  if (firstSquare.squareId === lastSquare.squareId) {
    return false;
  }
  if (lastPiece && lastPiece.team === firstPiece?.team) {
    return false;
  }
  if (firstPiece?.type !== PiecesType.KNIGHT) {
    let middleSquares = crossedSquares(board, firstSquare, lastSquare);
    return !middleSquares.some((item) => item?.piece);
  }
  return true;
};
