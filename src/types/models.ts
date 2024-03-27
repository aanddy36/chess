export const newCols = [1, 2, 3, 4, 5, 6, 7, 8];
export const newRows = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const GRID_SIZE = 64; //75
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
  CANCEL = "c",
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
  FIRST_M,
  PAWN_EN_PASSANT,
  ROOK_CASTLE,
  KING_CASTLE,
}
export enum MoveType {
  MOVE,
  CAPTURE,
  PROMOTE,
  CHECK,
  CASTLE,
  STALEMATE,
  CHECK_MATE,
}
export interface Coord {
  x: number;
  y: number;
}

export enum IsValidType {
  YES = "YES",
  NO = "NO",
  IN_PROCESS = "IN_PROCESS",
  NULL = "NULL",
}

export interface Validness {
  isValid: IsValidType;
  moveType?: MoveType;
  changeProp?: ChangeProp[];
  changeTeam?: Team;
  pieceToPromote?: PiecesType;
  capturedInPassant?: string;
  uptBoard?: SquareType[];
  rookChange?: {
    firstSq: SquareType;
    lastSq: SquareType;
  };
}

export const initialState: {
  cursorPos: Coord | null;
  isValid: Validness;
  lastMoveIDs: LastMove;
} = {
  cursorPos: null,
  isValid: {
    isValid: IsValidType.NULL,
  },
  lastMoveIDs: {
    first: null,
    last: null,
  },
};

export interface ChessCoord {
  x: string;
  y: number;
}

export interface SquareType {
  chessPosition: ChessCoord;
  color: SquareColor;
  gridPosition: Coord;
  piece: PieceType | null;
  inDanger: Attacker[];
  squareId: string;
}

export interface PieceType {
  type: PiecesType;
  team: Team;
  image: string;
  id: string;
  firstMoveDone?: boolean;
  enPassant?: boolean;
  pinDirec: Direcs | null;
}

export interface Attacker {
  id: string;
  team: Team;
}

export interface DangerSquare {
  attackPiece: { id: string; team: Team };
  targetSqr: string;
}

export enum Direcs {
  X = "X",
  Y = "Y",
  NE = "NE",
  NW = "NW",
}
