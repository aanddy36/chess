import { Pawn } from "../classes/Pawn";
import { Square } from "../classes/Square";
import { ChangeProp, MoveType, PiecesType, Team } from "../models";
import { crossedSquares } from "./crossedSquares";

interface Props {
  isValid: boolean;
  moveType?: MoveType;
  changeProp?: ChangeProp[];
  changeId?: string;
  capturedInPassant?: string;
}

export const isValidMove = (
  board: Square[],
  firstSquare: Square,
  lastSquare: Square
): Props => {
  const { piece: firstPiece } = firstSquare;
  const { piece: lastPiece } = lastSquare;

  if (
    firstSquare.squareId === lastSquare.squareId ||
    (lastPiece && lastPiece.team === firstPiece?.team)
  ) {
    return { isValid: false };
  }

  if (firstPiece?.type !== PiecesType.KNIGHT) {
    let middleSquares = crossedSquares(board, firstSquare, lastSquare);
    if (middleSquares.some((item) => item?.piece)) {
      return { isValid: false };
    }

    //PAWN
    if (firstPiece?.type === PiecesType.PAWN) {
      const { diagonalOneSquareMove, verticalMoveOnly, vertical } =
        Square.findDistance(firstSquare.gridPosition, lastSquare.gridPosition);
      const upOrDown = firstPiece.team === Team.BLACK ? 1 : -1;
      const direc = vertical * upOrDown;
      if (diagonalOneSquareMove && direc > 0) {
        if (lastPiece) {
          return { isValid: true, moveType: MoveType.CAPTURE };
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
          epPiece.team !== firstPiece.team &&
          (epPiece as Pawn).firstMoveDone
        ) {
          return {
            isValid: true,
            moveType: MoveType.CAPTURE,
            capturedInPassant: possibleEPSquare?.squareId,
            /* changeId: possibleEPSquare.piece.id, */
          };
        }
      }
      if (
        verticalMoveOnly &&
        !lastPiece &&
        Math.abs(vertical) < 3 &&
        direc > 0
      ) {
        if (Math.abs(vertical) === 1) {
          return {
            isValid: true,
            moveType: MoveType.MOVE,
            changeProp: [ChangeProp.PAWN_EN_PASSANT, ChangeProp.PAWN_FIRST_M],
            changeId: firstPiece.id,
          };
        }
        if (!(firstPiece as Pawn).firstMoveDone) {
          return {
            isValid: true,
            moveType: MoveType.MOVE,
            changeProp: [ChangeProp.PAWN_FIRST_M],
            changeId: firstPiece.id,
          };
        }
      }
      return { isValid: false };
    }
  }
  return { isValid: true };
};
