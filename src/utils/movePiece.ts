import { King } from "../classes/King";
import { Pawn } from "../classes/Pawn";
import { Piece } from "../classes/Piece";
import { Rook } from "../classes/Rook";
import { Square } from "../classes/Square";
import { ChangeProp, PiecesType, Team } from "../models";

interface ChangeObj {
  prop: ChangeProp[] | undefined;
  changeTeam: Team | undefined;
  capturedInPassant: string | undefined;
  pieceToPromote: PiecesType | undefined;
}

export function movePiece(
  firstSquare: Square,
  lastSquare: Square,
  array: Square[],
  changeObj: ChangeObj
) {
  let newArray = array.map((square) => {
    const { squareId, chessPosition, color, gridPosition } = square;
    //REMOVE A PIECE FROM A SQUARE
    if (
      squareId === firstSquare.squareId ||
      squareId === changeObj.capturedInPassant
    ) {
      return new Square(chessPosition, color, gridPosition);
    }

    if (squareId === lastSquare.squareId) {
      //CHANGE THE PIECE TO THE PROMOTED ONE
      let newPiece;

      if (changeObj.pieceToPromote && firstSquare.piece) {
        //CREATE A PIECE OR A ROOK WITH FIRST MOVE DONE
        newPiece =
          changeObj.pieceToPromote !== PiecesType.ROOK
            ? new Piece(changeObj.pieceToPromote, firstSquare.piece.team)
            : new Rook(firstSquare.piece.team, true);
      } else {
        switch (firstSquare.piece?.type) {
          case PiecesType.PAWN:
            newPiece = new Pawn(firstSquare.piece.team);
            break;
          case PiecesType.ROOK:
            newPiece = new Rook(firstSquare.piece.team);
            break;
          case PiecesType.KING:
            newPiece = new King(firstSquare.piece.team);
            break;
          default:
            newPiece = new Piece(
              firstSquare.piece?.type as PiecesType,
              firstSquare.piece?.team as Team
            );

            break;
        }
        //CHANGE PAWN PROPERTY WHEN IS MOVED FOR THE FIRST TIME
        if (
          changeObj.prop?.includes(ChangeProp.FIRST_M) ||
          (firstSquare.piece as Pawn).firstMoveDone === true
        ) {
          (newPiece as Pawn | Rook | King).firstMoveDone = true;
        }
        //CHANGE PAWN PROPERTY TO NOT PASSANTABLE ANYMORE
        if (
          newPiece?.type === PiecesType.PAWN &&
          changeObj.prop?.includes(ChangeProp.PAWN_EN_PASSANT) ||
          (firstSquare.piece as Pawn).enPassant === false
        ) {
          (newPiece as Pawn).enPassant = false;
        }
      }

      //WE RETURN THE SQUARE WITH THE UPDATED PIECE
      return new Square(chessPosition, color, gridPosition, newPiece);
    }
    //IF NOTHING CHANGED, RETURN THAT SQUARE UNTOUCHED
    return square;
  });
  return newArray;
}
