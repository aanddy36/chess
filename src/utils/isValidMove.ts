import { King } from "../classes/King";
import { Pawn } from "../classes/Pawn";
import { Piece } from "../classes/Piece";
import { Rook } from "../classes/Rook";
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
  console.log(firstSquare.gridPosition);
  console.log(lastSquare.gridPosition);
  if (
    firstSquare.squareId === lastSquare.squareId ||
    (lastPiece && lastPiece.team === firstPiece?.team) ||
    lastPiece?.type === PiecesType.KING
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
      case PiecesType.QUEEN:
        return Piece.validQueenMove(firstSquare, lastSquare);
      case PiecesType.BISHOP:
        return Piece.validBishopMove(firstSquare, lastSquare);
      case PiecesType.ROOK:
        return Rook.validRookMove(firstSquare, lastSquare);
      case PiecesType.KING:
        return King.validKingMove(firstSquare, lastSquare);
    }
  } else {
    return Piece.validKnightMove(firstSquare, lastSquare);
  }
  return { isValid: IsValidType.YES };
};
