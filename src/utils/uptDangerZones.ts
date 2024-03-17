import { InDanger, Square } from "../classes/Square";
import { evaluateFdz } from "./futureDangerZones";

export function uptDangerZones(board: Square[]) {
  let dangeredSqrs = board.map((sqr) => {
    const { piece } = sqr;
    if (piece) {
      let newD = evaluateFdz({
        type: piece.type,
        lastSquare: sqr,
        firstSquare: sqr,
        board,
      });
      return newD;
    }
  }) as any;
  dangeredSqrs = [
    ...new Set(
      dangeredSqrs
        .flatMap((item: string[] | undefined) => item)
        .filter((item: string | undefined) => item)
        .map((item: any) => JSON.stringify(item))
    ),
  ].map((item: any) => JSON.parse(item));
  
  const newBoard = board.map((b) => {
    const filt = (dangeredSqrs as InDanger[]).filter(
      (c: InDanger) => c.id === b.squareId
    );    
    b.inDanger = []
    for (let a of filt) {
      b.inDanger.push(a.team);
    }
    return b;
  });
  //console.log(newBoard);

  return newBoard;
}
