import { nanoid } from "nanoid";
import {
  ChangeProp,
  PieceType,
  PiecesType,
  SquareType,
  Team,
} from "../types/models";

interface ChangeObj {
  prop: ChangeProp[] | undefined;
  changeTeam: Team | undefined;
  capturedInPassant: string | undefined;
  pieceToPromote: PiecesType | undefined;
  rookChange?: {
    firstSq: SquareType;
    lastSq: SquareType;
  };
}

export function movePiece(
  firstSquare: SquareType,
  lastSquare: SquareType,
  array: SquareType[],
  changeObj: ChangeObj
) {
  let newArray = array.map((square) => {
    const { squareId } = square;
    //REMOVE A PIECE FROM A SQUARE
    if (
      squareId === firstSquare.squareId ||
      squareId === changeObj.capturedInPassant ||
      squareId === changeObj.rookChange?.firstSq.squareId
    ) {
      return {
        ...square,
        piece: null,
      };
    }

    if (squareId === lastSquare.squareId) {
      //CHANGE THE PIECE TO THE PROMOTED ONE
      let newPiece = {} as PieceType;

      if (changeObj.pieceToPromote && firstSquare.piece) {
        //CREATE A PIECE OR A ROOK WITH FIRST MOVE DONE
        newPiece = {
          type: changeObj.pieceToPromote,
          team: firstSquare.piece.team,
          image: `/src/assets/${firstSquare.piece.team}${changeObj.pieceToPromote}.png`,
          id: nanoid(),
          firstMoveDone: changeObj.pieceToPromote === PiecesType.ROOK && true,
          canMove: true,
        };
      } else {
        newPiece = { ...(firstSquare.piece as PieceType) };
        //CHANGE PAWN PROPERTY WHEN IS MOVED FOR THE FIRST TIME
        if (
          changeObj.prop?.includes(ChangeProp.FIRST_M) ||
          firstSquare.piece?.firstMoveDone === true
        ) {
          newPiece.firstMoveDone = true;
        }
        //CHANGE PAWN PROPERTY TO NOT PASSANTABLE ANYMORE
        if (
          (newPiece?.type === PiecesType.PAWN &&
            changeObj.prop?.includes(ChangeProp.PAWN_EN_PASSANT)) ||
          firstSquare.piece?.enPassant === false
        ) {
          newPiece.enPassant = false;
        }
      }

      //WE RETURN THE SQUARE WITH THE UPDATED PIECE
      return { ...square, piece: newPiece };
    }
    if (squareId === changeObj.rookChange?.lastSq.squareId) {
      let newPiece = {
        type: PiecesType.ROOK,
        team: firstSquare.piece?.team as Team,
        image: `/src/assets/${firstSquare.piece?.team as Team}r.png`,
        id: nanoid(),
        firstMoveDone: true,
        canMove: true,
      };
      return { ...square, piece: newPiece };
    }
    //IF NOTHING CHANGED, RETURN THAT SQUARE UNTOUCHED
    return { ...square };
  });
  return newArray;
}
