import { Pawn } from "../classes/Pawn";
import { Piece } from "../classes/Piece";
import { Square } from "../classes/Square";
import { PiecesType, SquareColor, Team, cols, rows } from "../models";

const initalPieces = [
  new Piece({ x: 0, y: 0 }, PiecesType.ROOK, Team.BLACK),
  new Piece({ x: 0, y: 1 }, PiecesType.KNIGHT, Team.BLACK),
  new Piece({ x: 0, y: 2 }, PiecesType.BISHOP, Team.BLACK),
  new Piece({ x: 0, y: 3 }, PiecesType.QUEEN, Team.BLACK),
  new Piece({ x: 0, y: 4 }, PiecesType.KING, Team.BLACK),
  new Piece({ x: 0, y: 5 }, PiecesType.BISHOP, Team.BLACK),
  new Piece({ x: 0, y: 6 }, PiecesType.KNIGHT, Team.BLACK),
  new Piece({ x: 0, y: 7 }, PiecesType.ROOK, Team.BLACK),
  new Pawn({ x: 1, y: 0 }, Team.BLACK),
  new Pawn({ x: 1, y: 1 }, Team.BLACK),
  new Pawn({ x: 1, y: 2 }, Team.BLACK),
  new Pawn({ x: 1, y: 3 }, Team.BLACK),
  new Pawn({ x: 1, y: 4 }, Team.BLACK),
  new Pawn({ x: 1, y: 5 }, Team.BLACK),
  new Pawn({ x: 1, y: 6 }, Team.BLACK),
  new Pawn({ x: 1, y: 7 }, Team.BLACK),
  new Pawn({ x: 6, y: 0 }, Team.WHITE),
  new Pawn({ x: 6, y: 1 }, Team.WHITE),
  new Pawn({ x: 6, y: 2 }, Team.WHITE),
  new Pawn({ x: 6, y: 3 }, Team.WHITE),
  new Pawn({ x: 6, y: 4 }, Team.WHITE),
  new Pawn({ x: 6, y: 5 }, Team.WHITE),
  new Pawn({ x: 6, y: 6 }, Team.WHITE),
  new Pawn({ x: 6, y: 7 }, Team.WHITE),
  new Piece({ x: 7, y: 0 }, PiecesType.ROOK, Team.WHITE),
  new Piece({ x: 7, y: 1 }, PiecesType.KNIGHT, Team.WHITE),
  new Piece({ x: 7, y: 2 }, PiecesType.BISHOP, Team.WHITE),
  new Piece({ x: 7, y: 3 }, PiecesType.QUEEN, Team.WHITE),
  new Piece({ x: 7, y: 4 }, PiecesType.KING, Team.WHITE),
  new Piece({ x: 7, y: 5 }, PiecesType.BISHOP, Team.WHITE),
  new Piece({ x: 7, y: 6 }, PiecesType.KNIGHT, Team.WHITE),
  new Piece({ x: 7, y: 7 }, PiecesType.ROOK, Team.WHITE),
];

export function createBoard() {
  const board = [];
  let gridX = 0;
  for (let i = cols.length - 1; i >= 0; i--) {
    let gridY = 0;
    for (let j = 0; j < rows.length; j++) {
      const color =
        (i % 2 === 0 ? j : j + 1) % 2 === 0
          ? SquareColor.GREEN
          : SquareColor.WHITE;

      const piece = initalPieces.find(
        (pie) => pie.gridPosition.x === gridX && pie.gridPosition.y === gridY
      );
      board.push(
        new Square(
          { x: cols[j], y: i + 1 },
          color,
          { x: gridX, y: gridY },
          piece
        )
      );
      gridY += 1;
    }
    gridX += 1;
  }
  return board;
}
