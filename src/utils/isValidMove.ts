import {
  IsValidType,
  MoveType,
  PieceType,
  PiecesType,
  SquareType,
  Team,
  Validness,
} from "../types/models";
import { canItMove } from "./canMove";
import { crossedSquares, otherTeam } from "./coordCalculus";

import { movePiece } from "./movePiece";
import { preventMate } from "./preventMate";
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
  lastSquare: SquareType,
  turn: Team
): Validness => {
  const { piece: firstPiece } = firstSquare;
  const { piece: lastPiece } = lastSquare;

  if (
    firstSquare.squareId === lastSquare.squareId ||
    (lastPiece && lastPiece.team === firstPiece?.team) ||
    lastPiece?.type === PiecesType.KING /*||
    !firstPiece?.pinDirec  ||
    firstPiece?.team !== turn */
  ) {
    return { isValid: IsValidType.NO };
  }

  //CHECK IF MOVE IS VALID FOR EACH BASED ON THE PIECE TYPE
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
  //IF IT IS VALID
  if (ans.isValid === IsValidType.YES) {
    const {
      changeProp,
      changeTeam,
      capturedInPassant,
      pieceToPromote,
      rookChange,
    } = ans;
    const temp = [...board];

    //UPDATE THE BOARD WITH THE NEW ORGANIZATION
    let newBoard = movePiece(firstSquare, lastSquare, temp, {
      prop: changeProp,
      changeTeam,
      capturedInPassant,
      pieceToPromote,
      rookChange,
    });
    //UPDATE THE SQUARES THREATHNED
    uptBoard = uptDangerZones(newBoard);

    //UPDATE PINNED AND CANMOVE PROPERTY
    uptBoard = uptBoard.map((item) => {
      let newPiece: PieceType | null = null;
      const { canMove, pinDirec } = canItMove(item, uptBoard);
      if (item.piece) {
        newPiece = { ...item.piece, pinDirec, canMove };
      }
      return { ...item, piece: newPiece };
    });
    console.log(uptBoard);

    let kings = uptBoard.filter((sq) => sq.piece?.type === PiecesType.KING);
    let allyKing = kings.filter((sq) => sq.piece?.team === firstPiece?.team)[0];
    let enemyKing = kings.filter(
      (sq) => sq.piece?.team === otherTeam(firstPiece?.team)
    )[0];

    if (allyKing.inDanger.some((sqr) => sqr.team !== firstPiece?.team)) {
      return { isValid: IsValidType.NO };
    }

    //IF ENEMY KING IS IN CHECK, MAKE THAT MOVEMENT
    if (enemyKing.inDanger.some((sqr) => sqr.team === firstPiece?.team)) {
      preventMate(uptBoard, lastSquare, enemyKing);

      return { isValid: IsValidType.YES, moveType: MoveType.CHECK, uptBoard };
    }

    
    const whitePieces = uptBoard.filter(
      (sqr) => sqr.piece?.team === Team.WHITE
    );
    const blackPieces = uptBoard.filter(
      (sqr) => sqr.piece?.team === Team.BLACK
    );

    //TABLAS
    if (
      !whitePieces.some((p) => p.piece?.canMove) ||
      !blackPieces.some((p) => p.piece?.canMove)
    ) {
      return {
        isValid: IsValidType.YES,
        moveType: MoveType.STALEMATE,
        uptBoard,
      };
    }

    return { ...ans, uptBoard };
  }
  return ans;
};
