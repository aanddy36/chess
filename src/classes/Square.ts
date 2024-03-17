import { Coord, SquareColor, Team, newRows } from "../models";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Rook } from "./Rook";

interface ChessCoord {
  x: string;
  y: number;
}
export interface InDanger {
  id: string;
  team: Team;
}

export class Square {
  chessPosition: ChessCoord;
  color: SquareColor;
  gridPosition: Coord;
  piece: Piece | Pawn | Rook | null;
  /* inDanger: InDanger[] | []; */

  static findDistance(start: Coord, end: Coord) {
    let absX = end.x - start.x;
    let absY = end.y - start.y;
    return {
      vertical: absY,
      horizontal: absX,
      horizontalMoveOnly: absX !== 0 && absY === 0,
      verticalMoveOnly: absY !== 0 && absX === 0,
      diagonalMoveOnly: Math.abs(absY) === Math.abs(absX),
      diagonalOneSquareMove: Math.abs(absY) === 1 && Math.abs(absX) === 1,
      verticalOneSquareMove: Math.abs(absX) === 0 && Math.abs(absY) === 1,
      horizontalOneSquareMove: Math.abs(absX) === 1 && Math.abs(absY) === 0,
    };
  }

  static convertToChessGrid(coord: Coord) {
    const nums = [8, 7, 6, 5, 4, 3, 2, 1];
    return `${newRows[coord.x]}${nums[coord.y]}`;
  }
  inDanger = [] as Team[]
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
