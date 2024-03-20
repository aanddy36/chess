import {
  ChangeProp,
  IsValidType,
  MoveType,
  SquareType,
  Validness,
} from "../../types/models";
import { findDistance } from "../coordCalculus";

export function validRookMove(
  firstSquare: SquareType,
  lastSquare: SquareType
): Validness {
  const { piece: lastPiece } = lastSquare;
  const { verticalMoveOnly, horizontalMoveOnly } = findDistance(
    firstSquare.gridPosition,
    lastSquare.gridPosition
  );
  if (verticalMoveOnly || horizontalMoveOnly) {
    return {
      isValid: IsValidType.YES,
      moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
      changeProp: !firstSquare.piece?.firstMoveDone ? [ChangeProp.FIRST_M] : [],
    };
  }
  return { isValid: IsValidType.NO };
}
