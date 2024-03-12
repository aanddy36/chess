import { PiecesType, Team } from "../models";

export class Piece {
    gridPosition: {
      x: number;
      y: number;
    };
    type: PiecesType;
    team: Team;
    image: string;
    constructor(
      gridPosition: { x: number; y: number },
      type: PiecesType,
      team: Team
    ) {
      this.gridPosition = gridPosition;
      this.type = type;
      this.team = team;
      this.image = `/src/assets/${this.team}${this.type}.png`;
    }
  }