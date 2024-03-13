export const rows = [1, 2, 3, 4, 5, 6, 7, 8];
export const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const GRID_SIZE = 64;
export enum SquareColor {
  GREEN,
  WHITE,
}
export enum PiecesType {
  PAWN = "p",
  ROOK = "r",
  KNIGHT = "n",
  QUEEN = "q",
  KING = "k",
  BISHOP = "b",
}

export enum Team {
  BLACK = "b",
  WHITE = "w",
}

export interface LastMove {
  first: string | null;
  last: string | null;
}

export enum ChangeProp {
  PAWN_FIRST_M,
  PAWN_EN_PASSANT,
  ROOK_CASTLE,
  KING_CASTLE,
}
export enum MoveType {
  MOVE,
  CAPTURE,
  CASTLE,
  PROMOTE,
  CHECK,
  CHECK_MATE,
}
export interface Coord {
  x: number;
  y: number;
}
