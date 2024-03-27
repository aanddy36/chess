import { PieceType, PiecesType, SquareType } from "../types/models";
import { convertToChessGrid, crossedSquares } from "./coordCalculus";

export function preventMate(
  board: SquareType[],
  firstSquare: SquareType,
  king: SquareType
) {
  let canScape = false;
  const { team: kingTeam } = king.piece as PieceType;

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
  if (!canScape) {
    //RETRIEVE THE SQRS THAT ARE BETWEEN THE THREATNER AND THE KING
    let sqrs: SquareType[] = [];
    const upFirstSq = board.filter(
      (sq) => sq.squareId === firstSquare.squareId
    )[0];

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
      return { id: sq?.squareId, pieces: inDanPieces };
    });

    const canBeInter = interfSqrs.map((sect) => {
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
    console.log(canBeInter);
    console.log(interfSqrs);
  }
  console.log(canScape);
}
