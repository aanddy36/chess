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

export class King extends Piece {
  firstMoveDone = false;

  constructor(team: Team) {
    super(PiecesType.KING, team);
  }
  static validKingMove(firstSquare: Square, lastSquare: Square): Validness {
    const { piece: lastPiece } = lastSquare;
    const {
      verticalOneSquareMove,
      horizontalOneSquareMove,
      diagonalOneSquareMove,
    } = Square.findDistance(firstSquare.gridPosition, lastSquare.gridPosition);

    if (
      verticalOneSquareMove ||
      horizontalOneSquareMove ||
      diagonalOneSquareMove
    ) {
      return {
        isValid: IsValidType.YES,
        moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
        changeProp: !(firstSquare.piece as King).firstMoveDone
          ? [ChangeProp.FIRST_M]
          : [],
      };
    }
    return { isValid: IsValidType.NO };
  }
}
