import { Pawn } from "../classes/Pawn";
import { Square } from "../classes/Square";
import { IsValidType, PiecesType, Validness } from "../models";
import { crossedSquares } from "./crossedSquares";

export const isValidMove = (
  board: Square[],
  firstSquare: Square,
  lastSquare: Square
): Validness => {
  const { piece: firstPiece } = firstSquare;
  const { piece: lastPiece } = lastSquare;

  if (
    firstSquare.squareId === lastSquare.squareId ||
    (lastPiece && lastPiece.team === firstPiece?.team)
  ) {
    return { isValid: IsValidType.NO };
  }

  if (firstPiece?.type !== PiecesType.KNIGHT) {
    let middleSquares = crossedSquares(board, firstSquare, lastSquare);
    if (middleSquares.some((item) => item?.piece)) {
      return { isValid: IsValidType.NO };
    }
    switch (firstPiece?.type) {
      case PiecesType.PAWN:
        return Pawn.validPawnMove(firstSquare, lastSquare, board);
    }
  }
  return { isValid: IsValidType.YES };
};
