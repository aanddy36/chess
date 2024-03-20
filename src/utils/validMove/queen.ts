import { IsValidType, MoveType, SquareType, Validness } from "../../types/models";
import { findDistance } from "../coordCalculus";

export function validQueenMove(
  firstSquare: SquareType,
  lastSquare: SquareType
): Validness {
  const { piece: lastPiece } = lastSquare;
  const { verticalMoveOnly, horizontalMoveOnly, diagonalMoveOnly } =
    findDistance(firstSquare.gridPosition, lastSquare.gridPosition);

  if (verticalMoveOnly || horizontalMoveOnly || diagonalMoveOnly) {
    return {
      isValid: IsValidType.YES,
      moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
    };
  }
  return { isValid: IsValidType.NO };
}
