import {
  ChangeProp,
  Coord,
  PiecesType,
  SquareColor,
  Team,
  cols,
} from "../models";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";

interface ChessCoord {
  x: string;
  y: number;
}
interface ChangeObj {
  prop: ChangeProp[] | undefined;
  changeTeam: Team | undefined;
  capturedInPassant: string | undefined;
  pieceToPromote: PiecesType | undefined;
}

export class Square {
  chessPosition: ChessCoord;
  color: SquareColor;
  gridPosition: Coord;
  piece: Piece | Pawn | null;

  static movePiece(
    firstSquare: Square,
    lastSquare: Square,
    array: Square[],
    changeObj: ChangeObj
  ) {
    let newArray = array.map((square) => {
      if (
        square.squareId === firstSquare.squareId ||
        square.squareId === changeObj.capturedInPassant
      ) {
        return new Square(
          square.chessPosition,
          square.color,
          square.gridPosition
        );
      }
      if (square.squareId === lastSquare.squareId) {
        if (changeObj.pieceToPromote && firstSquare.piece) {
          firstSquare.piece = new Piece(
            square.gridPosition,
            changeObj.pieceToPromote,
            firstSquare.piece.team
          );
        }
        if (changeObj.prop?.includes(ChangeProp.PAWN_FIRST_M)) {
          (firstSquare.piece as Pawn).firstMoveDone = true;
        }
        if (changeObj.prop?.includes(ChangeProp.PAWN_EN_PASSANT)) {
          (firstSquare.piece as Pawn).enPassant = false;
        }

        return new Square(
          square.chessPosition,
          square.color,
          square.gridPosition,
          firstSquare.piece
        );
      }
      return square;
    });
    return newArray;
  }

  static findDistance(start: Coord, end: Coord) {
    let absX = end.x - start.x;
    let absY = end.y - start.y;
    return {
      vertical: absX,
      horizontal: absY,
      horizontalMoveOnly: absY !== 0 && absX === 0,
      verticalMoveOnly: absX !== 0 && absY === 0,
      diagonalOneSquareMove: Math.abs(absY) === 1 && Math.abs(absX) === 1,
    };
  }

  static convertToChessGrid(coord: Coord) {
    const nums = [8, 7, 6, 5, 4, 3, 2, 1];
    return `${cols[coord.y]}${nums[coord.x]}`;
  }

  constructor(
    chessPosition: ChessCoord,
    color: SquareColor,
    gridPosition: Coord,
    piece: Piece | null = null
  ) {
    this.chessPosition = chessPosition;
    this.color = color;
    this.gridPosition = gridPosition;
    this.piece = piece;
  }

  get squareId() {
    return `${this.chessPosition.x}${this.chessPosition.y}`;
  }
}
