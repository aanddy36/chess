import { PieceType, PiecesType, SquareType, Team } from "../types/models";
import {
  convertToChessGrid,
  crossedSquares,
  findDistance,
} from "./coordCalculus";

const startRow = {
  [Team.BLACK]: 0,
  [Team.WHITE]: 7,
};

export function preventMate(
  board: SquareType[],
  firstSquare: SquareType,
  king: SquareType
) {
  let canScape = false;
  const { team: kingTeam } = king.piece as PieceType;
  const upFirstSq = board.filter(
    (sq) => sq.squareId === firstSquare.squareId
  )[0];

  //CHECK IF KING CAN MOVE TO SURROUNDING SQUARES
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
  let surrSqrs = [];
  for (let pos of possiblePairs) {
    const newX = king.gridPosition.x + pos.x;
    const newY = king.gridPosition.y + pos.y;
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
      continue;
    }
    let id = convertToChessGrid({ x: newX, y: newY });
    const square = board.filter((sq) => sq.squareId === id)[0];

    surrSqrs.push(square);
  }
  if (
    surrSqrs.some(
      (sq) =>
        !sq.inDanger.some((d) => d.team !== kingTeam) &&
        (!sq.piece || (sq.piece && sq.piece.team !== kingTeam))
    )
  ) {
    canScape = true;
  }

  //IN CASE THE KING CANT MOVE
  let canBeInter: boolean[] = [];
  if (!canScape) {
    //RETRIEVE THE SQRS THAT ARE BETWEEN THE THREATNER AND THE KING
    let sqrs: SquareType[] = [];

    //ONLY IF NOT A KNIGHT, WE WILL FIND THE SQRS IN THE TRAJECTORY
    if (upFirstSq.piece?.type !== PiecesType.KNIGHT) {
      sqrs = crossedSquares(board, upFirstSq, king) as SquareType[];
    }
    sqrs.push(upFirstSq);

    //GETS AN ARRAY WITH THE PIECES THAT THREAT EACH SQR
    const interfSqrs = sqrs.map((sq) => {
      let inDanPieces: PieceType[] = [];
      sq?.inDanger.forEach((d) => {
        //EXCLUDE THE PIECES OF THE ATTACKING TEAM
        if (d.team === kingTeam) {
          const a = board.filter((a) => {
            const { piece: attackingPiece } = a;

            //EXCLUDE THE KING AND ACCEPT PAWNS IF THEY ARE IN ATTACKING POSITION (DIAGONAL)
            if (
              a.squareId === d.id &&
              attackingPiece?.type !== PiecesType.KING &&
              (attackingPiece?.type !== PiecesType.PAWN ||
                (attackingPiece?.type === PiecesType.PAWN && sq.piece))
            ) {
              return a.piece as PieceType;
            }
          })[0];
          if (a?.piece) {
            inDanPieces.push(a.piece);
          }
        }
      });

      //CHECK FOR PAWNS UP OR DOWN
      const { verticalMoveOnly } = findDistance(
        upFirstSq.gridPosition,
        king.gridPosition
      );
      const upOrDown = kingTeam === Team.BLACK ? -1 : 1;
      const limite = startRow[kingTeam] + upOrDown * -1; //6
      const isBeyond = sq.gridPosition.y * upOrDown < limite * upOrDown;

      //FILTER IF THE CHECK IS NOT VERTICAL, AND OTHER THINGS
      if (!verticalMoveOnly && !sq.piece && isBeyond) {
        const twoPawnsSq = startRow[kingTeam] - 3 * upOrDown;
        //SI ESTA EN LA CASILLA 3 O 4 REVISA 2 CASILLAS ABAJO
        if (twoPawnsSq === sq.gridPosition.y) {
          for (
            let i = (twoPawnsSq + upOrDown) * upOrDown;
            i <= limite * upOrDown;
            i++
          ) {
            const id = convertToChessGrid({
              x: sq.gridPosition.x,
              y: Math.abs(i),
            });

            const square = board.filter((sq) => sq.squareId === id)[0];
            if (square.piece && square.piece.type === PiecesType.PAWN) {
              inDanPieces.push(square.piece);
              break;
            } else if (square.piece) {
              break;
            }
          }
          //SI ESTA EN CUALQUIER OTRA CASILLA
        } else {
          const id = convertToChessGrid({
            x: sq.gridPosition.x,
            y: sq.gridPosition.y + upOrDown,
          });
          const square = board.filter((sq) => sq.squareId === id)[0];
          if (square.piece && square.piece.type === PiecesType.PAWN) {
            inDanPieces.push(square.piece);
          }
        }
      }
      return { id: sq?.squareId, pieces: inDanPieces };
    });

    canBeInter = interfSqrs.map((sect) => {
      if (!sect.pieces?.length) {
        return false;
      }
      const anyPiece = sect.pieces.some((p) => {
        if (p.pinDirec) {
          return false;
        } else {
          return true;
        }
      });
      return anyPiece;
    });
    canScape = canBeInter.some((sq) => sq);
  }

  return !canScape;
}
