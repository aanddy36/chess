import {
  DangerSquare,
  Direcs,
  PiecesType,
  SquareType,
  Team,
} from "../types/models";
import { cmBishop } from "./canMove/Bi&Qu&Ro";
import { cmKing, cmKnight } from "./canMove/kingAndKnight";
import { cmPawn } from "./canMove/pawn";
import { convertToChessGrid, getDirec } from "./coordCalculus";

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

export function canItMove(
  square: SquareType,
  board: SquareType[]
): { canMove: boolean; pinDirec: Direcs | null } {
  const { x, y } = square.gridPosition;
  let canMove = false;
  //CHECK IF THE PIECE CAN BE MOVED NORMALLY
  switch (square.piece?.type) {
    case PiecesType.PAWN:
      canMove = cmPawn(square, board);
      break;
    case PiecesType.ROOK:
      canMove = cmBishop(square, board);
      break;
    case PiecesType.QUEEN:
      canMove = cmBishop(square, board);
      break;
    case PiecesType.BISHOP:
      canMove = cmBishop(square, board);
      break;
    case PiecesType.KING:
      canMove = cmKing(square, board);
      break;
    case PiecesType.KNIGHT:
      canMove = cmKnight(square, board);
      break;
  }
  //IF CANT MOVE, THEN WE SHOULDNT EVALUATE IF ITS PINNED, WE RETURN FALSE
  if (!canMove) {
    return { canMove, pinDirec: null };
  }

  //ALGORITHM TO FIND PINNED PIECES. IF PIECE CANT BE MOVED, IT WILL NOT ENTER HERE
  const possiblePairs = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ];
  let posPaths = [];

  //FIRST I CHECK THE POSSIBLE PATHS EACH PIECE CAN BE PINNED. WOULDNT INCLUDE THE BORDERS
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

  //PIECES IN THE BORDERS ARE EXCLUDED AS THEY CANT BE PINNED
  if (!posPaths.length) {
    return { canMove, pinDirec: null };
  }

  //WE EVALUATE EACH DIRECTION TO SEE IF IT IS PINNED
  let sqrsByDirec = posPaths.map((dir) => {
    let sqrs = [];
    const myDirec = getDirec(dir);

    //CHEQUEAMOS SI LA CASILLA DE MAS ADELANTE TIENE AL REY DE NUESTRO EQUIPO O A UNA PIEZA
    //RIVAL. PARARÁ HASTA ENCONTRAR UNA PIEZA
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

    //SI EL ARRAY NO TIENE A NUESTRO REY O NO TIENE UNA FICHA DEL RIVAL, SE VACIA
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

    //EN CASO DE QUE AUN HAYA CANDIDATOS, SE ENTRA
    let posDirecs: Direcs | null = null;
    if (sqrs.length) {
      //ENCONTRAMOS LA FICHA ENEMIGA
      let { piece: enemyPiece } = sqrs.find(
        (pi) => pi.piece && pi.piece?.team !== square.piece?.team
      ) as SquareType;

      switch (enemyPiece?.type) {
        case PiecesType.ROOK:
          if (myDirec === Direcs.X || myDirec === Direcs.Y) {
            posDirecs = myDirec;
          }
          break;
        case PiecesType.QUEEN:
          posDirecs = myDirec;
          break;
        case PiecesType.BISHOP:
          if (myDirec === Direcs.NE || myDirec === Direcs.NW) {
            posDirecs = myDirec;
          }
          break;
      }
    }
    return posDirecs;
  });
  sqrsByDirec = sqrsByDirec.filter((dir) => dir);
  if (!sqrsByDirec.length) {
    return { canMove, pinDirec: null };
  } else {
    return { canMove, pinDirec: sqrsByDirec[0] };
  }
}
