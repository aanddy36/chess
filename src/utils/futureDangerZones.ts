import { Coord, PiecesType, SquareType, Team } from "../types/models";
import { convertToChessGrid } from "./coordCalculus";

export function fdzPawn(
  upOrDown: number,
  lastSquare: SquareType,
  firstSquare: SquareType
) {
  const aheadY =
    upOrDown === 1
      ? lastSquare.gridPosition.y + 1
      : lastSquare.gridPosition.y - 1;
  const dangerArray = [];
  if (lastSquare.gridPosition.x - 1 >= 0) {
    const newSq = {
      id: convertToChessGrid({
        x: lastSquare.gridPosition.x - 1,
        y: aheadY,
      }),
      team: firstSquare.piece?.team,
    };
    dangerArray.push(newSq);
  }
  if (lastSquare.gridPosition.x + 1 <= 7) {
    const newSq = {
      id: convertToChessGrid({
        x: lastSquare.gridPosition.x + 1,
        y: aheadY,
      }),
      team: firstSquare.piece?.team,
    };
    dangerArray.push(newSq);
  }
  return dangerArray;
}

export function fdzKnight(lastSquare: SquareType, firstSquare: SquareType) {
  const possiblePairs =
    firstSquare.piece?.type === PiecesType.KNIGHT
      ? [
          { x: 2, y: 1 },
          { x: 2, y: -1 },
          { x: 1, y: 2 },
          { x: 1, y: -2 },
          { x: -2, y: 1 },
          { x: -2, y: -1 },
          { x: -1, y: 2 },
          { x: -1, y: -2 },
        ]
      : [
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
          { x: 1, y: -1 },
          { x: 0, y: -1 },
          { x: -1, y: -1 },
          { x: -1, y: 0 },
          { x: -1, y: 1 },
        ];
  const dangerArray = [];
  for (let pos of possiblePairs) {
    const newX = lastSquare.gridPosition.x + pos.x;
    const newY = lastSquare.gridPosition.y + pos.y;
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
      continue;
    }
    const newSq = {
      id: convertToChessGrid({ x: newX, y: newY }),
      team: firstSquare.piece?.team,
    };
    dangerArray.push(newSq);
  }
  return dangerArray;
}

export function fdzRook(
  lastSquare: SquareType,
  board: SquareType[],
  firstSquare: SquareType
) {
  const { x, y } = lastSquare.gridPosition;
  let possiblePairs = [] as Coord[];
  switch (firstSquare.piece?.type) {
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

  const dangerArray = [];
  for (let pos of possiblePairs) {
    for (let i = 1; i < 8; i++) {
      const newX = x + pos.x * i;
      const newY = y + pos.y * i;
      if (newY < 0 || newY > 7 || newX < 0 || newX > 7) {
        break;
      }
      const newId = convertToChessGrid({ x: newX, y: newY });
      const newDanger = board.filter((sq) => sq.squareId === newId)[0];
      const newSq = {
        id: convertToChessGrid(newDanger.gridPosition),
        team: firstSquare.piece?.team,
      };
      dangerArray.push(newSq);
      if (newDanger.piece && firstSquare.piece?.id !== newDanger.piece.id) {
        break;
      }
    }
  }
  return dangerArray;
}
export function evaluateFdz({
  type,
  lastSquare,
  firstSquare,
  board,
}: {
  type: PiecesType;
  lastSquare: SquareType;
  firstSquare: SquareType;
  board: SquareType[];
}) {
  switch (type) {
    case PiecesType.PAWN:
      return fdzPawn(
        lastSquare.piece?.team === Team.BLACK ? 1 : -1,
        lastSquare,
        firstSquare
      );
    case PiecesType.ROOK:
      return fdzRook(lastSquare, board, firstSquare);
    case PiecesType.QUEEN:
      return fdzRook(lastSquare, board, firstSquare);
    case PiecesType.BISHOP:
      return fdzRook(lastSquare, board, firstSquare);
    case PiecesType.KING:
      return fdzKnight(lastSquare, firstSquare);
    case PiecesType.KNIGHT:
      return fdzKnight(lastSquare, firstSquare);
  }
}
