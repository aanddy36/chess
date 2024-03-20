import { IsValidType, MoveType, SquareType, Validness } from "../../types/models";
import { findDistance } from "../coordCalculus";

export function validKnightMove(
  firstSquare: SquareType,
  lastSquare: SquareType
): Validness {
  const { piece: lastPiece } = lastSquare;
  const { vertical, horizontal } = findDistance(
    firstSquare.gridPosition,
    lastSquare.gridPosition
  );
  const knightMove =
    (Math.abs(vertical) === 2 && Math.abs(horizontal) == 1) ||
    (Math.abs(vertical) === 1 && Math.abs(horizontal) == 2);
  if (knightMove) {
    return {
      isValid: IsValidType.YES,
      moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
    };
  }
  return { isValid: IsValidType.NO };
}
