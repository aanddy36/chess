import {
  Coord,
  DangerSquare,
  PiecesType,
  SquareType,
  Team,
} from "../types/models";
import { cmBishop } from "./canMove/Bi&Qu&Ro";
import { cmKing, cmKnight } from "./canMove/kingAndKnight";
import { cmPawn } from "./canMove/pawn";
import { convertToChessGrid } from "./coordCalculus";

export function sqrsPawn(
  upOrDown: number,
  lastSquare: SquareType,
  firstSquare: SquareType
) {
  const attackPiece = {
    id: firstSquare.squareId,
    team: firstSquare.piece?.team as Team,
  };
  const aheadY =
    upOrDown === 1
      ? lastSquare.gridPosition.y + 1
      : lastSquare.gridPosition.y - 1;
  const dangerArray = [] as DangerSquare[];
  if (lastSquare.gridPosition.x - 1 >= 0) {
    const newSq: DangerSquare = {
      attackPiece,
      targetSqr: convertToChessGrid({
        x: lastSquare.gridPosition.x - 1,
        y: aheadY,
      }),
    };
    dangerArray.push(newSq);
  }
  if (lastSquare.gridPosition.x + 1 <= 7) {
    const newSq: DangerSquare = {
      attackPiece,
      targetSqr: convertToChessGrid({
        x: lastSquare.gridPosition.x + 1,
        y: aheadY,
      }),
    };
    dangerArray.push(newSq);
  }

  return dangerArray;
}

export function canItMove(square: SquareType, board: SquareType[]) {
  switch (square.piece?.type) {
    case PiecesType.PAWN:
      return cmPawn(square, board);
    case PiecesType.ROOK:
      return cmBishop(square, board);
    case PiecesType.QUEEN:
      return cmBishop(square, board);
    case PiecesType.BISHOP:
      return cmBishop(square, board);
    case PiecesType.KING:
      return cmKing(square, board);
    case PiecesType.KNIGHT:
      return cmKnight(square, board);
  }
}
