import { Square } from "../classes/Square";

export const crossedSquares = (
  board: Square[],
  firstSquare: Square,
  lastSquare: Square
) => {
  const startingPoint = firstSquare.gridPosition;
  const endingPoint = lastSquare.gridPosition;
  let { vertical, horizontal } = Square.findDistance(
    startingPoint,
    endingPoint
  );

  let filteredBoard = [];
  if (vertical !== 0 && horizontal !== 0) {
    let direcX = horizontal >= 0 ? 1 : -1;
    let direcY = vertical >= 0 ? 1 : -1;
    for (let i = 1; i < Math.abs(vertical); i++) {
      filteredBoard.push(
        board.find(
          (square) =>
            square.gridPosition.x === Math.abs(startingPoint.x * direcX + i) &&
            square.gridPosition.y === Math.abs(startingPoint.y * direcY + i)
        )
      );
    }
    return filteredBoard;
  }
  if (vertical !== 0) {
    let direc = vertical >= 0 ? 1 : -1;
    for (
      let i = startingPoint.y * direc + 1;
      i < (startingPoint.y + vertical) * direc;
      i++
    ) {
      filteredBoard.push(
        board.find(
          (square) =>
            square.gridPosition.y === Math.abs(i) &&
            square.gridPosition.x === startingPoint.x
        )
      );
    }
    return filteredBoard;
  }
  //IF HORIZONTAL != 0
  let direc = horizontal >= 0 ? 1 : -1;
  for (
    let i = startingPoint.x * direc + 1;
    i < (startingPoint.x + horizontal) * direc;
    i++
  ) {
    filteredBoard.push(
      board.find(
        (square) =>
          square.gridPosition.x === Math.abs(i) &&
          square.gridPosition.y === startingPoint.y
      )
    );
  }
  return filteredBoard;
};