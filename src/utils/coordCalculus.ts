import { Coord, SquareType, Team, newRows } from "../types/models";

export function findDistance(start: Coord, end: Coord) {
  let absX = end.x - start.x;
  let absY = end.y - start.y;
  return {
    vertical: absY,
    horizontal: absX,
    horizontalMoveOnly: absX !== 0 && absY === 0,
    verticalMoveOnly: absY !== 0 && absX === 0,
    diagonalMoveOnly: Math.abs(absY) === Math.abs(absX),
    diagonalOneSquareMove: Math.abs(absY) === 1 && Math.abs(absX) === 1,
    verticalOneSquareMove: Math.abs(absX) === 0 && Math.abs(absY) === 1,
    horizontalOneSquareMove: Math.abs(absX) === 1 && Math.abs(absY) === 0,
  };
}

export function convertToChessGrid(coord: Coord) {
  const nums = [8, 7, 6, 5, 4, 3, 2, 1];
  return `${newRows[coord.x]}${nums[coord.y]}`;
}

export function otherTeam(team: Team | undefined) {
  if (team === Team.WHITE) {
    return Team.BLACK;
  }
  return Team.WHITE;
}

export const crossedSquares = (
    board: SquareType[],
    firstSquare: SquareType,
    lastSquare: SquareType
  ) => {
    const startingPoint = firstSquare.gridPosition;
    const endingPoint = lastSquare.gridPosition;
    let { vertical, horizontal } = findDistance(startingPoint, endingPoint);
  
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
  