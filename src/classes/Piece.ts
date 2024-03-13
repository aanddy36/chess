import { Coord, PiecesType, Team } from "../models";
import { nanoid } from "nanoid";

export class Piece {
  gridPosition: Coord;
  type: PiecesType;
  team: Team;
  image: string;
  id: string;
  constructor(
    gridPosition: Coord,
    type: PiecesType,
    team: Team
  ) {
    this.gridPosition = gridPosition;
    this.type = type;
    this.team = team;
    this.image = `/src/assets/${this.team}${this.type}.png`;
    this.id = nanoid();
  }
}
