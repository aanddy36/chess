import {
  ChangeProp,
  IsValidType,
  MoveType,
  PiecesType,
  Team,
  Validness,
} from "../models";
import { fdzKnight } from "../utils/futureDangerZones";
import { Piece } from "./Piece";
import { Square } from "./Square";

export class King extends Piece {
  firstMoveDone = false;

  constructor(team: Team) {
    super(PiecesType.KING, team);
  }
  static validKingMove(firstSquare: Square, lastSquare: Square): Validness {
    const { piece: lastPiece } = lastSquare;
    const { piece: firstPiece } = firstSquare;
    /* fdzKnight(lastSquare, firstSquare.piece?.type); */
    const {
      verticalOneSquareMove,
      horizontalOneSquareMove,
      diagonalOneSquareMove,
    } = Square.findDistance(firstSquare.gridPosition, lastSquare.gridPosition);
    const willBeInDanger = lastSquare.inDanger.some(
      (sq) => sq != firstPiece?.team
    );
    if (
      (verticalOneSquareMove ||
        horizontalOneSquareMove ||
        diagonalOneSquareMove) &&
      !willBeInDanger
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
