import { DangerSquare, SquareType } from "../types/models";
import { getDangerSqrs } from "./inDangerSqrs";

export function uptDangerZones(board: SquareType[]) {

  let examp: (DangerSquare | undefined)[] | (DangerSquare[] | undefined)[] = [];
  examp = board.map((sqr) => {
    const { piece } = sqr;
    if (piece) {
      let newD = getDangerSqrs({
        type: piece.type,
        lastSquare: sqr,
        firstSquare: sqr,
        board,
      });
      return newD;
    }
  });
  examp = examp.flatMap((item) => item).filter((item) => item);

  const tempBoard = board.map((b) => {
    const filt = (examp as DangerSquare[]).filter(
      (c) => c.targetSqr === b.squareId
    );
    b.inDanger = [];

    for (let a of filt) {
      b.inDanger.push(a.attackPiece);
    }
    return b;
  });


  return tempBoard;
}
