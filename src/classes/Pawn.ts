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

export class Pawn extends Piece {
  firstMoveDone = false;
  enPassant = true;

  constructor(team: Team) {
    super(PiecesType.PAWN, team);
  }

  static validPawnMove(
    firstSquare: Square,
    lastSquare: Square,
    board: Square[]
  ): Validness {
    const { piece: firstPiece } = firstSquare;
    const { piece: lastPiece } = lastSquare;

    const { diagonalOneSquareMove, verticalMoveOnly, vertical } =
      Square.findDistance(firstSquare.gridPosition, lastSquare.gridPosition);
    const upOrDown = firstPiece?.team === Team.BLACK ? 1 : -1;
    const direc = vertical * upOrDown;
    const lastRef = firstPiece?.team === Team.BLACK ? 1 : 8;

    //fdzPawn(upOrDown, lastSquare);

    if (lastRef === lastSquare.chessPosition.y) {
      return {
        isValid: IsValidType.IN_PROCESS,
        changeTeam: firstPiece?.team,
      };
    }

    if (diagonalOneSquareMove && direc > 0) {
      if (lastPiece) {
        return {
          isValid: IsValidType.YES,
          moveType: MoveType.CAPTURE,
          changeProp: !(firstPiece as Pawn).firstMoveDone
            ? [ChangeProp.FIRST_M]
            : [],
        };
      }
      //EN PASSANT
      const id = Square.convertToChessGrid({
        ...lastSquare.gridPosition,
        y: lastSquare.gridPosition.y - 1 * upOrDown,
      });

      const possibleEPSquare = board.find((sq) => sq.squareId === id);
      const { piece: epPiece } = possibleEPSquare as Square;

      if (
        epPiece &&
        (epPiece as Pawn).enPassant &&
        epPiece.team !== firstPiece?.team &&
        (epPiece as Pawn).firstMoveDone
      ) {
        return {
          isValid: IsValidType.YES,
          moveType: MoveType.CAPTURE,
          capturedInPassant: possibleEPSquare?.squareId,
        };
      }
    }

    if (verticalMoveOnly && !lastPiece && Math.abs(vertical) < 3 && direc > 0) {
      if ((firstPiece as Pawn).firstMoveDone && Math.abs(vertical) === 1) {
        return {
          isValid: IsValidType.YES,
          moveType: MoveType.MOVE,
        };
      } else if (!(firstPiece as Pawn).firstMoveDone) {
        return {
          isValid: IsValidType.YES,
          moveType: MoveType.MOVE,
          changeProp:
            Math.abs(vertical) === 1
              ? [ChangeProp.PAWN_EN_PASSANT, ChangeProp.FIRST_M]
              : [ChangeProp.FIRST_M],
        };
      }
    }
    return { isValid: IsValidType.NO };
  }
}
