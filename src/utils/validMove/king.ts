import {
  ChangeProp,
  IsValidType,
  MoveType,
  PiecesType,
  SquareType,
  Validness,
} from "../../types/models";
import { convertToChessGrid, findDistance, otherTeam } from "../coordCalculus";

export function validKingMove(
  firstSquare: SquareType,
  lastSquare: SquareType,
  board: SquareType[]
): Validness {
  const { piece: lastPiece } = lastSquare;
  const { piece: firstPiece } = firstSquare;
  const {
    verticalOneSquareMove,
    horizontalOneSquareMove,
    diagonalOneSquareMove,
    horizontalMoveOnly,
    horizontal,
  } = findDistance(firstSquare.gridPosition, lastSquare.gridPosition);

  const willBeInDanger = lastSquare.inDanger.some(
    (sq) => sq.team != firstPiece?.team
  );

  //CASTLE CASE
  if (
    horizontalMoveOnly &&
    Math.abs(horizontal) === 2 &&
    !firstSquare.piece?.firstMoveDone
  ) {
    let direc = horizontal / Math.abs(horizontal);
    let piecesCount = 0;
    let dangerArray = [];
    const { x, y } = firstSquare.gridPosition;
    for (let i = 0; i < 8; i++) {
      const newX = x + direc * i;
      if (newX < 0 || newX > 7) {
        break;
      }
      const newId = convertToChessGrid({ x: newX, y });
      const newSq = board.filter((sq) => sq.squareId === newId)[0];
      dangerArray.push(newSq);
      if (newSq.piece) {
        piecesCount += 1;
      }
    }
    const rook = dangerArray[dangerArray.length - 1];
    const inDanger = dangerArray.some((sq) =>
      sq.inDanger.some((item) => item.team === otherTeam(firstPiece?.team))
    );
    if (
      piecesCount === 2 &&
      rook.piece?.type === PiecesType.ROOK &&
      !rook.piece.firstMoveDone &&
      !inDanger
    ) {
      const newId = convertToChessGrid({
        x: lastSquare.gridPosition.x + direc * -1,
        y,
      });
      const newRookPos = dangerArray.filter((sq) => sq.squareId === newId)[0];

      return {
        isValid: IsValidType.YES,
        moveType: MoveType.CASTLE,
        changeProp: [ChangeProp.FIRST_M],
        rookChange: { firstSq: rook, lastSq: newRookPos },
      };
    }
  }

  //REGULAR KING MOVE
  if (
    (verticalOneSquareMove ||
      horizontalOneSquareMove ||
      diagonalOneSquareMove) &&
    !willBeInDanger
  ) {
    return {
      isValid: IsValidType.YES,
      moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
      changeProp: !firstSquare.piece?.firstMoveDone ? [ChangeProp.FIRST_M] : [],
    };
  }
  return { isValid: IsValidType.NO };
}
