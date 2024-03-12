import { PiecesType, Team } from "../models";
import { Piece } from "./Piece";

export class Pawn extends Piece {
  firstMoveDone = false;
  enPassant = true;
  constructor(gridPosition: { x: number; y: number }, team: Team) {
    super(gridPosition, PiecesType.PAWN, team);
  }
}
