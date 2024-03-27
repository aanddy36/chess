import { Coord, PiecesType, SquareType } from "../../types/models";
import { convertToChessGrid } from "../coordCalculus";

export function cmBishop(square: SquareType, board: SquareType[]): boolean {
  const { x, y } = square.gridPosition;
  let possiblePairs = [] as Coord[];
  switch (square.piece?.type) {
    case PiecesType.ROOK:
      possiblePairs = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ];
      break;
    case PiecesType.BISHOP:
      possiblePairs = [
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
      ];
      break;
    case PiecesType.QUEEN:
      possiblePairs = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
        { x: -1, y: 1 },
        { x: -1, y: -1 },
      ];
      break;
  }

  let canMove = false;
  for (let pos of possiblePairs) {
    for (let i = 1; i < 8; i++) {
      const newX = x + pos.x * i;
      const newY = y + pos.y * i;
      if (newY < 0 || newY > 7 || newX < 0 || newX > 7) {
        break;
      }
      const newId = convertToChessGrid({ x: newX, y: newY });
      const newDanger = board.filter((sq) => sq.squareId === newId)[0];
      if (
        !newDanger.piece ||
        (newDanger.piece.team !== square.piece?.team &&
          newDanger.piece.type !== PiecesType.KING)
      ) {
        canMove = true;
      }

      if (
        (newDanger.piece && square.piece?.id !== newDanger.piece.id) ||
        canMove
      ) {
        break;
      }
    }
    if (canMove) {
      break;
    }
  }
  return canMove
}
