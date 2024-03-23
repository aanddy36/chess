import { PiecesType, SquareType } from "../../types/models";
import { convertToChessGrid } from "../coordCalculus";

export function cmKing(square: SquareType, board: SquareType[]) {
  const possiblePairs = [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
  ];

  let canMove = false;
  for (let pos of possiblePairs) {
    const newX = square.gridPosition.x + pos.x;
    const newY = square.gridPosition.y + pos.y;
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
      continue;
    }
    let id = convertToChessGrid({ x: newX, y: newY });

    //CHECK IF IT CAN MOVE

    let sqr = board.filter((sqr) => sqr.squareId === id)[0];
    if (
      (!sqr.piece ||
        (sqr.piece.team !== square.piece?.team &&
          sqr.piece.type !== PiecesType.KING)) &&
      !sqr.inDanger.some((item) => item.team !== square.piece?.team)
    ) {
      //console.log(newX, newY);
      
      canMove = true;
    }
    if (canMove) {
      break;
    }
  }
  //console.log(square.piece?.team, canMove);
  
  return canMove;
}
export function cmKnight(square: SquareType, board: SquareType[]) {
  const possiblePairs = [
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: 2 },
    { x: 1, y: -2 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
    { x: -1, y: 2 },
    { x: -1, y: -2 },
  ];

  let canMove = false;
  for (let pos of possiblePairs) {
    const newX = square.gridPosition.x + pos.x;
    const newY = square.gridPosition.y + pos.y;
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
      continue;
    }
    let id = convertToChessGrid({ x: newX, y: newY });

    //CHECK IF IT CAN MOVE

    let sqr = board.filter((sqr) => sqr.squareId === id)[0];
    if (
      !sqr.piece ||
      (sqr.piece.team !== square.piece?.team &&
        sqr.piece.type !== PiecesType.KING)
    ) {
      canMove = true;
    }
    if (canMove) {
      break;
    }
  }
  return canMove;
}
