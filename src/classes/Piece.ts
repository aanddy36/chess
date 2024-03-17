import { IsValidType, MoveType, PiecesType, Team, Validness } from "../models";
import { nanoid } from "nanoid";
import { Square } from "./Square";

export class Piece {
  //gridPosition: Coord;
  type: PiecesType;
  team: Team;
  image: string;
  id: string;
  constructor(type: PiecesType, team: Team) {
    this.type = type;
    this.team = team;
    this.image = `/src/assets/${this.team}${this.type}.png`;
    this.id = nanoid();
  }

  static validQueenMove(firstSquare: Square, lastSquare: Square): Validness {
    const { piece: lastPiece } = lastSquare;
    const { verticalMoveOnly, horizontalMoveOnly, diagonalMoveOnly } =
      Square.findDistance(firstSquare.gridPosition, lastSquare.gridPosition);

    if (verticalMoveOnly || horizontalMoveOnly || diagonalMoveOnly) {
      return {
        isValid: IsValidType.YES,
        moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
      };
    }
    return { isValid: IsValidType.NO };
  }
  static validBishopMove(
    firstSquare: Square,
    lastSquare: Square,
  ): Validness {
    const { piece: lastPiece } = lastSquare;
    const { diagonalMoveOnly } = Square.findDistance(
      firstSquare.gridPosition,
      lastSquare.gridPosition
    );
    if (diagonalMoveOnly) {
      return {
        isValid: IsValidType.YES,
        moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
      };
    }
    return { isValid: IsValidType.NO };
  }
  static validKnightMove(firstSquare: Square, lastSquare: Square): Validness {
    const { piece: lastPiece } = lastSquare;
    const { vertical, horizontal } = Square.findDistance(
      firstSquare.gridPosition,
      lastSquare.gridPosition
    );
    const knightMove =
      (Math.abs(vertical) === 2 && Math.abs(horizontal) == 1) ||
      (Math.abs(vertical) === 1 && Math.abs(horizontal) == 2);
    if (knightMove) {
      return {
        isValid: IsValidType.YES,
        moveType: lastPiece ? MoveType.CAPTURE : MoveType.MOVE,
      };
    }
    return { isValid: IsValidType.NO };
  }

  static otherTeam(team: Team | undefined) {
    if (team === Team.WHITE) {
      return Team.BLACK;
    }
    return Team.WHITE;
  }
}
