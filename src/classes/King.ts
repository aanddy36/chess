import {
  ChangeProp,
  IsValidType,
  MoveType,
  PiecesType,
  Team,
  Validness,
} from "../models";
import { Piece } from "./Piece";
import { Rook } from "./Rook";
import { Square } from "./Square";

export class King extends Piece {
  firstMoveDone = false;

  constructor(team: Team) {
    super(PiecesType.KING, team);
  }
  static validKingMove(
    firstSquare: Square,
    lastSquare: Square,
    board: Square[]
  ): Validness {
    const { piece: lastPiece } = lastSquare;
    const { piece: firstPiece } = firstSquare;
    /* fdzKnight(lastSquare, firstSquare.piece?.type); */
    const {
      verticalOneSquareMove,
      horizontalOneSquareMove,
      diagonalOneSquareMove,
      horizontalMoveOnly,
      horizontal,
    } = Square.findDistance(firstSquare.gridPosition, lastSquare.gridPosition);

    const willBeInDanger = lastSquare.inDanger.some(
      (sq) => sq != firstPiece?.team
    );

    //CASTLE CASE
    if (
      horizontalMoveOnly &&
      Math.abs(horizontal) === 2 &&
      !(firstSquare.piece as King).firstMoveDone
    ) {
      let direc = horizontal / Math.abs(horizontal);
      let piecesCount = 0;
      let dangerArray = [];
      const { x, y } = firstSquare.gridPosition;
      for (let i = 0; i < 8; i++) {
        const newX = x + direc * i;
        if (newX < 0 || newX > 7) {
          break;
        }
        const newId = Square.convertToChessGrid({ x: newX, y });
        const newSq = board.filter((sq) => sq.squareId === newId)[0];
        dangerArray.push(newSq);
        if (newSq.piece) {
          piecesCount += 1;
        }
      }
      const rook = dangerArray[dangerArray.length - 1];
      const inDanger = dangerArray.some((sq) =>
        sq.inDanger.includes(Piece.otherTeam(firstPiece?.team))
      );
      if (
        piecesCount === 2 &&
        rook.piece?.type === PiecesType.ROOK &&
        !(rook.piece as Rook).firstMoveDone &&
        !inDanger
      ) {
        const newId = Square.convertToChessGrid({
          x: lastSquare.gridPosition.x + direc * -1,
          y,
        });
        const newRookPos = dangerArray.filter((sq) => sq.squareId === newId)[0];

        return {
          isValid: IsValidType.YES,
          moveType: MoveType.CASTLE,
          changeProp: [ChangeProp.FIRST_M],
          rookChange: { firstSq: rook, lastSq: newRookPos },
        };
      }
    }

    //REGULAR KING MOVE
    if (
      (verticalOneSquareMove ||
        horizontalOneSquareMove ||
        diagonalOneSquareMove) &&
      !willBeInDanger
    ) {
      return {
        isValid: IsValidType.YES,
        moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
        changeProp: !(firstSquare.piece as King).firstMoveDone
          ? [ChangeProp.FIRST_M]
          : [],
      };
    }
    return { isValid: IsValidType.NO };
  }
}
