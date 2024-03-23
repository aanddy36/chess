import {
  ChangeProp,
  IsValidType,
  MoveType,
  SquareType,
  Team,
  Validness,
} from "../../types/models";
import { convertToChessGrid, findDistance } from "../coordCalculus";

export const validPawnMove = (
  firstSquare: SquareType,
  lastSquare: SquareType,
  board: SquareType[]
): Validness => {
  const { piece: firstPiece } = firstSquare;
  const { piece: lastPiece } = lastSquare;

  const { diagonalOneSquareMove, verticalMoveOnly, vertical } = findDistance(
    firstSquare.gridPosition,
    lastSquare.gridPosition
  );
  const upOrDown = firstPiece?.team === Team.BLACK ? 1 : -1;
  const direc = vertical * upOrDown;
  const lastRef = firstPiece?.team === Team.BLACK ? 1 : 8;

  //PAWN ATTACK DIAGONALLY
  if (diagonalOneSquareMove && direc > 0) {
    //IF THERE IS AN ENEMY PAWN
    if (lastPiece) {
      //IF IS THE LAST SQUARE
      if (lastRef === lastSquare.chessPosition.y) {
        return {
          isValid: IsValidType.IN_PROCESS,
          changeTeam: firstPiece?.team,
        };
      }
      return {
        isValid: IsValidType.YES,
        moveType: MoveType.CAPTURE,
        changeProp: !firstPiece?.firstMoveDone ? [ChangeProp.FIRST_M] : [],
      };
    }
    //EN PASSANT
    const id = convertToChessGrid({
      ...lastSquare.gridPosition,
      y: lastSquare.gridPosition.y - 1 * upOrDown,
    });

    const possibleEPSquare = board.find((sq) => sq.squareId === id);
    const { piece: epPiece } = possibleEPSquare as SquareType;

    if (
      epPiece &&
      epPiece.enPassant &&
      epPiece.team !== firstPiece?.team &&
      epPiece.firstMoveDone
    ) {
      return {
        isValid: IsValidType.YES,
        moveType: MoveType.CAPTURE,
        capturedInPassant: possibleEPSquare?.squareId,
      };
    }
  }

  if (verticalMoveOnly && !lastPiece && Math.abs(vertical) < 3 && direc > 0) {
    if (firstPiece?.firstMoveDone && Math.abs(vertical) === 1) {
      if (lastRef === lastSquare.chessPosition.y) {
        return {
          isValid: IsValidType.IN_PROCESS,
          changeTeam: firstPiece?.team,
        };
      }
      return {
        isValid: IsValidType.YES,
        moveType: MoveType.MOVE,
        changeProp: firstPiece.enPassant ? [ChangeProp.PAWN_EN_PASSANT] : [],
      };
    } else if (!firstPiece?.firstMoveDone) {
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
};
