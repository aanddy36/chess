import { Square } from "../classes/Square";
import { PiecesType } from "../models";

export function futureDangerZonePawn(upOrDown: number, lastSquare: Square) {
  const nums = [8, 7, 6, 5, 4, 3, 2, 1];
  console.log(lastSquare.gridPosition);

  
  console.log(
    upOrDown === 1
      ? lastSquare.gridPosition.y + 1
      : lastSquare.gridPosition.y - 1
  );
}
