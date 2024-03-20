import { IsValidType, MoveType, SquareType, Validness } from "../../types/models";
import { findDistance } from "../coordCalculus";

export function validBishopMove(
  firstSquare: SquareType,
  lastSquare: SquareType
): Validness {
  const { piece: lastPiece } = lastSquare;
  const { diagonalMoveOnly } = findDistance(
    firstSquare.gridPosition,
    lastSquare.gridPosition
  );
  if (diagonalMoveOnly) {
    return {
      isValid: IsValidType.YES,
      moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
    };
  }
  return { isValid: IsValidType.NO };
}
