import { SquareColor, cols } from "../models";
import { Piece } from "./Piece";

export class Square {
  chessPosition: {
    x: string;
    y: number;
  };
  color: SquareColor;
  gridPosition: {
    x: number;
    y: number;
  };
  piece: Piece | null;
  static movePiece(firstSquare: Square, lastSquare: Square, array: Square[]) {
    let newArray = array.map((square) => {
      if (square.squareId === firstSquare.squareId) {
        return new Square(
          square.chessPosition,
          square.color,
          square.gridPosition
        );
      }
      if (square.squareId === lastSquare.squareId) {
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
  constructor(
    chessPosition: {
      x: string;
      y: number;
    },
    color: SquareColor,
    gridPosition: {
      x: number;
      y: number;
    },
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
