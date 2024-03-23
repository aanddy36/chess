import { nanoid } from "nanoid";
import { Coord, PieceType, PiecesType, Team } from "./types/models";

interface Props {
  piece: PieceType;
  pos: Coord;
}

export const startingPieces: Props[] = [
  {
    piece: {
      type: PiecesType.ROOK,
      team: Team.BLACK,
      image: `/src/assets/br.png`,
      id: nanoid(),
      firstMoveDone: false,
      canMove: false,
    },
    pos: { x: 0, y: 0 },
  },
  {
    piece: {
      type: PiecesType.KNIGHT,
      team: Team.BLACK,
      image: `/src/assets/bn.png`,
      id: nanoid(),
      canMove: true,
    },
    pos: { x: 1, y: 0 },
  },
  {
    piece: {
      type: PiecesType.BISHOP,
      team: Team.BLACK,
      image: `/src/assets/bb.png`,
      id: nanoid(),
      canMove: false,
    },
    pos: { x: 2, y: 0 },
  },
  {
    piece: {
      type: PiecesType.QUEEN,
      team: Team.BLACK,
      image: `/src/assets/bq.png`,
      id: nanoid(),
      canMove: false,
    },
    pos: { x: 3, y: 0 },
  },
  {
    piece: {
      type: PiecesType.KING,
      team: Team.BLACK,
      image: `/src/assets/bk.png`,
      id: nanoid(),
      firstMoveDone: false,
      canMove: false,
    },
    pos: { x: 4, y: 0 },
  },
  {
    piece: {
      type: PiecesType.BISHOP,
      team: Team.BLACK,
      image: `/src/assets/bb.png`,
      id: nanoid(),
      canMove: false,
    },
    pos: { x: 5, y: 0 },
  },
  {
    piece: {
      type: PiecesType.KNIGHT,
      team: Team.BLACK,
      image: `/src/assets/bn.png`,
      id: nanoid(),
      canMove: true,
    },
    pos: { x: 6, y: 0 },
  },
  {
    piece: {
      type: PiecesType.ROOK,
      team: Team.BLACK,
      image: `/src/assets/br.png`,
      id: nanoid(),
      firstMoveDone: false,
      canMove: false,
    },
    pos: { x: 7, y: 0 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 0, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 1, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 2, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 3, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 4, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 5, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 6, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.BLACK,
      image: `/src/assets/bp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 7, y: 1 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 0, y: 6 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 1, y: 6 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 2, y: 6 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 3, y: 6 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 4, y: 6 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 5, y: 6 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 6, y: 6 },
  },
  {
    piece: {
      type: PiecesType.PAWN,
      team: Team.WHITE,
      image: `/src/assets/wp.png`,
      id: nanoid(),
      firstMoveDone: false,
      enPassant: true,
      canMove: true,
    },
    pos: { x: 7, y: 6 },
  },
  {
    piece: {
      type: PiecesType.ROOK,
      team: Team.WHITE,
      image: `/src/assets/wr.png`,
      id: nanoid(),
      firstMoveDone: false,
      canMove: false,
    },
    pos: { x: 0, y: 7 },
  },
  {
    piece: {
      type: PiecesType.KNIGHT,
      team: Team.WHITE,
      image: `/src/assets/wn.png`,
      id: nanoid(),
      canMove: true,
    },
    pos: { x: 1, y: 7 },
  },
  {
    piece: {
      type: PiecesType.BISHOP,
      team: Team.WHITE,
      image: `/src/assets/wb.png`,
      id: nanoid(),
      canMove: false,
    },
    pos: { x: 2, y: 7 },
  },
  {
    piece: {
      type: PiecesType.QUEEN,
      team: Team.WHITE,
      image: `/src/assets/wq.png`,
      id: nanoid(),
      canMove: false,
    },
    pos: { x: 3, y: 7 },
  },
  {
    piece: {
      type: PiecesType.KING,
      team: Team.WHITE,
      image: `/src/assets/wk.png`,
      id: nanoid(),
      firstMoveDone: false,
      canMove: false,
    },
    pos: { x: 4, y: 7 },
  },
  {
    piece: {
      type: PiecesType.BISHOP,
      team: Team.WHITE,
      image: `/src/assets/wb.png`,
      id: nanoid(),
      canMove: false,
    },
    pos: { x: 5, y: 7 },
  },
  {
    piece: {
      type: PiecesType.KNIGHT,
      team: Team.WHITE,
      image: `/src/assets/wn.png`,
      id: nanoid(),
      canMove: true,
    },
    pos: { x: 6, y: 7 },
  },
  {
    piece: {
      type: PiecesType.ROOK,
      team: Team.WHITE,
      image: `/src/assets/wr.png`,
      id: nanoid(),
      firstMoveDone: false,
      canMove: false,
    },
    pos: { x: 7, y: 7 },
  },
];
