import { PiecesType, SquareType, Team } from "../../types/models";
import { convertToChessGrid } from "../coordCalculus";

export function cmPawn(square: SquareType, board: SquareType[]) {
  const { x, y } = square.gridPosition;
  const aheadY =
    square.piece?.team === Team.BLACK
      ? square.gridPosition.y + 1
      : square.gridPosition.y - 1;
  let possibleX = [
    { x: 1, y: aheadY },
    { x: 0, y: aheadY },
    { x: -1, y: aheadY },
    { x: -1, y },
    { x: 1, y },
  ];

  let canMove = false;

  //diagonal attack
  for (let pos of possibleX) {
    const newX = x + pos.x;
    const newY = pos.y;
    //console.log(newY);

    if (newY < 0 || newY > 7 || newX < 0 || newX > 7) {
      continue;
    }
    const newId = convertToChessGrid({ x: newX, y: newY });
    const newDanger = board.filter((sq) => sq.squareId === newId)[0];
    const { piece: destPiece } = newDanger;
    if (pos.x === 0 && !destPiece) {
      canMove = true;
    } else if (
      pos.x !== 0 &&
      pos.y !== square.gridPosition.y &&
      destPiece &&
      destPiece?.team !== square.piece?.team &&
      destPiece?.type !== PiecesType.KING
    ) {
      canMove = true;
    } else if (
      pos.y === square.gridPosition.y &&
      destPiece &&
      destPiece.firstMoveDone &&
      destPiece.type === PiecesType.PAWN &&
      destPiece.enPassant
    ) {
      const newId = convertToChessGrid({
        x: newX,
        y: destPiece.team === Team.BLACK ? pos.y - 1 : pos.y + 1,
      });

      const newDanger = board.filter((sq) => sq.squareId === newId)[0];
      if (!newDanger.piece) {
        canMove = true;
      }
    }
    if (canMove) {
      break;
    }
  }
  return canMove;
}
