import { King } from "./classes/King";
import { Pawn } from "./classes/Pawn";
import { Piece } from "./classes/Piece";
import { Rook } from "./classes/Rook";
import { PiecesType, Team } from "./models";

export const initalPieces = [
    { piece: new Rook(Team.BLACK), pos: { x: 0, y: 0 } },
    { piece: new Piece(PiecesType.KNIGHT, Team.BLACK), pos: { x: 1, y: 0 } },
    { piece: new Piece(PiecesType.BISHOP, Team.BLACK), pos: { x: 2, y: 0 } },
    { piece: new Piece(PiecesType.QUEEN, Team.BLACK), pos: { x: 3, y: 0 } },
    { piece: new King(Team.BLACK), pos: { x: 4, y: 0 } },
    { piece: new Piece(PiecesType.BISHOP, Team.BLACK), pos: { x: 5, y: 0 } },
    { piece: new Piece(PiecesType.KNIGHT, Team.BLACK), pos: { x: 6, y: 0 } },
    { piece: new Rook(Team.BLACK), pos: { x: 7, y: 0 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 0, y: 1 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 1, y: 1 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 2, y: 1 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 3, y: 1 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 4, y: 1 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 5, y: 1 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 6, y: 1 } },
    { piece: new Pawn(Team.BLACK), pos: { x: 7, y: 1 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 0, y: 6 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 1, y: 6 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 2, y: 6 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 3, y: 6 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 4, y: 6 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 5, y: 6 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 6, y: 6 } },
    { piece: new Pawn(Team.WHITE), pos: { x: 7, y: 6 } },
    { piece: new Rook(Team.WHITE), pos: { x: 0, y: 7 } },
    { piece: new Piece(PiecesType.KNIGHT, Team.WHITE), pos: { x: 1, y: 7 } },
    { piece: new Piece(PiecesType.BISHOP, Team.WHITE), pos: { x: 2, y: 7 } },
    { piece: new Piece(PiecesType.QUEEN, Team.WHITE), pos: { x: 3, y: 7 } },
    { piece: new King(Team.WHITE), pos: { x: 4, y: 7 } },
    { piece: new Piece(PiecesType.BISHOP, Team.WHITE), pos: { x: 5, y: 7 } },
    { piece: new Piece(PiecesType.KNIGHT, Team.WHITE), pos: { x: 6, y: 7 } },
    { piece: new Rook(Team.WHITE), pos: { x: 7, y: 7 } },
  ];