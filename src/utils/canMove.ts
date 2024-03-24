import { DangerSquare, PiecesType, SquareType, Team } from "../types/models";
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
  const { x, y } = square.gridPosition;
  let ans = false;
  switch (square.piece?.type) {
    case PiecesType.PAWN:
      ans = cmPawn(square, board);
      break;
    case PiecesType.ROOK:
      ans = cmBishop(square, board);
      break;
    case PiecesType.QUEEN:
      ans = cmBishop(square, board);
      break;
    case PiecesType.BISHOP:
      ans = cmBishop(square, board);
      break;
    case PiecesType.KING:
      ans = cmKing(square, board);
      break;
    case PiecesType.KNIGHT:
      ans = cmKnight(square, board);
      break;
  }

  //ALGORITHM TO FIND PINNED PIECES
  if (ans) {
    const possiblePairs = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
    ];
    let posPaths = [];

    //FIRST I CHECK THE POSSIBLE PATHS EACH PIECE HAS. WOULDNT INCLUDE THE BORDERS
    for (let i of possiblePairs) {
      const rightX = x + i.x;
      const upY = y + i.y;
      const leftX = x + i.x * -1;
      const downY = y + i.y * -1;
      if (
        rightX < 0 ||
        rightX > 7 ||
        upY < 0 ||
        upY > 7 ||
        leftX < 0 ||
        leftX > 7 ||
        downY < 0 ||
        downY > 7
      ) {
        continue;
      }
      posPaths.push(i);
    }

    //DIRECTIONS THAT ARE IN THE BORDER ARE EXCLUDED
    if (posPaths.length) {
      let allSqrs = posPaths.map((dir) => {
        let sqrs = [];

        for (let i = 1; i < 8; i++) {
          const newX = x + dir.x * i;
          const newY = y + dir.y * i;
          if (newY < 0 || newY > 7 || newX < 0 || newX > 7) {
            break;
          }
          const newId = convertToChessGrid({ x: newX, y: newY });
          const newSqr = board.filter((sq) => sq.squareId === newId)[0];
          const { piece } = newSqr;
          if (
            piece &&
            piece.type !== PiecesType.KING &&
            piece.team === square.piece?.team
          ) {
            break;
          }
          if (piece && piece.team !== square.piece?.team) {
            sqrs.push(newSqr);
            break;
          }
          sqrs.push(newSqr);
        }

        for (let i = 1; i < 8; i++) {
          const newX = x + dir.x * i * -1;
          const newY = y + dir.y * i * -1;
          if (newY < 0 || newY > 7 || newX < 0 || newX > 7) {
            break;
          }
          const newId = convertToChessGrid({ x: newX, y: newY });
          const newSqr = board.filter((sq) => sq.squareId === newId)[0];
          const { piece } = newSqr;
          if (
            piece &&
            piece.type !== PiecesType.KING &&
            piece.team === square.piece?.team
          ) {
            break;
          }
          if (piece && piece.team !== square.piece?.team) {
            sqrs.push(newSqr);
            break;
          }
          sqrs.push(newSqr);
        }
        if (
          !sqrs.some(
            (sq) =>
              sq.piece?.type === PiecesType.KING &&
              sq.piece.team === square.piece?.team
          ) ||
          !sqrs.some((sq) => sq.piece && sq.piece?.team !== square.piece?.team)
        ) {
          sqrs = [];
        }
        if (sqrs.length) {
          let temp = sqrs.find(
            (pi) => pi.piece && pi.piece?.team !== square.piece?.team
          );
          if (
            (dir.x === 1 && dir.y === 0) ||
            (dir.x === 0 &&
              dir.y === 1 &&
              temp?.piece?.type !== PiecesType.QUEEN &&
              temp?.piece?.type !== PiecesType.ROOK)
          ) {
            sqrs = [];
          }
        }
        return sqrs;
      });
      allSqrs = allSqrs.filter((arr) => arr.length);

      if (allSqrs.length) {
        ans = false;
      }
    }
  }
  return ans;
}
