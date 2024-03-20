import {
  IsValidType,
  MoveType,
  PiecesType,
  SquareType,
  Team,
  Validness,
} from "../types/models";
import { crossedSquares, otherTeam } from "./coordCalculus";

import { movePiece } from "./movePiece";
import { uptDangerZones } from "./uptDangerZones";
import { validBishopMove } from "./validMove/bishop";
import { validKingMove } from "./validMove/king";
import { validKnightMove } from "./validMove/knight";
import { validPawnMove } from "./validMove/pawn";
import { validQueenMove } from "./validMove/queen";
import { validRookMove } from "./validMove/rook";

export const isValidMove = (
  board: SquareType[],
  firstSquare: SquareType,
  lastSquare: SquareType
): Validness => {
  const { piece: firstPiece } = firstSquare;
  const { piece: lastPiece } = lastSquare;

  if (
    firstSquare.squareId === lastSquare.squareId ||
    (lastPiece && lastPiece.team === firstPiece?.team) ||
    lastPiece?.type === PiecesType.KING
  ) {
    return { isValid: IsValidType.NO };
  }
  let ans = {} as Validness;
  if (firstPiece?.type !== PiecesType.KNIGHT) {
    let middleSquares = crossedSquares(board, firstSquare, lastSquare);
    if (middleSquares.some((item) => item?.piece)) {
      return { isValid: IsValidType.NO };
    }
    switch (firstPiece?.type) {
      case PiecesType.PAWN:
        ans = validPawnMove(firstSquare, lastSquare, board);
        break;
      case PiecesType.QUEEN:
        ans = validQueenMove(firstSquare, lastSquare);
        break;
      case PiecesType.BISHOP:
        ans = validBishopMove(firstSquare, lastSquare);
        break;
      case PiecesType.ROOK:
        ans = validRookMove(firstSquare, lastSquare);
        break;
      case PiecesType.KING:
        ans = validKingMove(firstSquare, lastSquare, board);
        break;
    }
  } else {
    ans = validKnightMove(firstSquare, lastSquare);
  }
  let uptBoard = [] as SquareType[];
  if (ans.isValid === IsValidType.YES) {
    const {
      changeProp,
      changeTeam,
      capturedInPassant,
      pieceToPromote,
      rookChange,
    } = ans;
    const temp = [...board];

    let newBoard = movePiece(firstSquare, lastSquare, temp, {
      prop: changeProp,
      changeTeam,
      capturedInPassant,
      pieceToPromote,
      rookChange,
    });
    uptBoard = uptDangerZones(newBoard);
    let kings = uptBoard.filter((sq) => sq.piece?.type === PiecesType.KING);
    let allyKing = kings.filter((sq) => sq.piece?.team === firstPiece?.team)[0];
    let enemyKing = kings.filter(
      (sq) => sq.piece?.team === otherTeam(firstPiece?.team)
    )[0];
    if (allyKing.inDanger.includes(otherTeam(firstPiece?.team))) {
      return { isValid: IsValidType.NO };
    }
    if (enemyKing.inDanger.includes(firstPiece?.team as Team)) {
      return { isValid: IsValidType.YES, moveType: MoveType.CHECK };
    }
    return { ...ans, uptBoard };
  }
  return ans;
};
