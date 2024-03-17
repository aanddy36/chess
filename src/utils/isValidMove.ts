import { King } from "../classes/King";
import { Pawn } from "../classes/Pawn";
import { Piece } from "../classes/Piece";
import { Rook } from "../classes/Rook";
import { Square } from "../classes/Square";
import { IsValidType, PiecesType, Validness } from "../models";
import { crossedSquares } from "./crossedSquares";
import { movePiece } from "./movePiece";
import { uptDangerZones } from "./uptDangerZones";

export const isValidMove = (
  board: Square[],
  firstSquare: Square,
  lastSquare: Square
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
        ans = Pawn.validPawnMove(firstSquare, lastSquare, board);
        break;
      case PiecesType.QUEEN:
        ans = Piece.validQueenMove(firstSquare, lastSquare);
        break;
      case PiecesType.BISHOP:
        ans = Piece.validBishopMove(firstSquare, lastSquare);
        break;
      case PiecesType.ROOK:
        ans = Rook.validRookMove(firstSquare, lastSquare);
        break;
      case PiecesType.KING:
        ans = King.validKingMove(firstSquare, lastSquare);
        break;
    }
  } else {
    ans = Piece.validKnightMove(firstSquare, lastSquare);
  }
  let uptBoard = [] as Square[];
  if (ans.isValid === IsValidType.YES) {
    const { changeProp, changeTeam, capturedInPassant, pieceToPromote } = ans;
    const temp = [...board];

    let newBoard = movePiece(firstSquare, lastSquare, temp, {
      prop: changeProp,
      changeTeam,
      capturedInPassant,
      pieceToPromote,
    });
    uptBoard = uptDangerZones(newBoard);
    let kingSqr = uptBoard.filter(
      (sq) =>
        sq.piece?.type === PiecesType.KING && sq.piece.team === firstPiece?.team
    )[0];
    if (kingSqr.inDanger.includes(Piece.otherTeam(firstPiece?.team))) {
      return { isValid: IsValidType.NO };
    }
    return { ...ans, uptBoard };
  }
  return { isValid: IsValidType.NO };
};
