import {
  ChangeProp,
  IsValidType,
  MoveType,
  PiecesType,
  Team,
  Validness,
} from "../models";
import { Piece } from "./Piece";

import { Square } from "./Square";

export class Rook extends Piece {
  firstMoveDone: boolean;

  constructor(team: Team, firstMoveDone: boolean = false) {
    super(PiecesType.ROOK, team);
    this.firstMoveDone = firstMoveDone;
  }
  static validRookMove(firstSquare: Square, lastSquare: Square): Validness {
    const { piece: lastPiece } = lastSquare;
    const { verticalMoveOnly, horizontalMoveOnly } = Square.findDistance(
      firstSquare.gridPosition,
      lastSquare.gridPosition
    );
    if (verticalMoveOnly || horizontalMoveOnly) {
      return {
        isValid: IsValidType.YES,
        moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
        changeProp: !(firstSquare.piece as Rook).firstMoveDone
          ? [ChangeProp.FIRST_M]
          : [],
      };
    }
    return { isValid: IsValidType.NO };
  }
}
