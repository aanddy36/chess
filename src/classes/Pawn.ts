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

  constructor(gridPosition: { x: number; y: number }, team: Team) {
    super(gridPosition, PiecesType.PAWN, team);
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

    if (
      diagonalOneSquareMove &&
      direc > 0 &&
      lastPiece?.type !== PiecesType.KING
    ) {
      if (lastPiece) {
        if (lastRef === lastSquare.chessPosition.y) {
          return {
            isValid: IsValidType.IN_PROCESS,
            changeTeam: firstPiece?.team,
          };
        }

        return { isValid: IsValidType.YES, moveType: MoveType.CAPTURE };
      }
      //EN PASSANT
      const id = Square.convertToChessGrid({
        ...lastSquare.gridPosition,
        x: lastSquare.gridPosition.x - 1 * upOrDown,
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
      if (Math.abs(vertical) === 1) {
        if (lastRef === lastSquare.chessPosition.y) {
          return {
            isValid: IsValidType.IN_PROCESS,
            changeTeam: firstPiece?.team,
          };
        }
        return {
          isValid: IsValidType.YES,
          moveType: MoveType.MOVE,
          changeProp: [ChangeProp.PAWN_EN_PASSANT, ChangeProp.PAWN_FIRST_M],
          //changeId: firstPiece?.id,
        };
      }
      if (!(firstPiece as Pawn).firstMoveDone) {
        return {
          isValid: IsValidType.YES,
          moveType: MoveType.MOVE,
          changeProp: [ChangeProp.PAWN_FIRST_M],
          //changeId: firstPiece?.id,
        };
      }
    }

    return { isValid: IsValidType.NO };
  }
}
