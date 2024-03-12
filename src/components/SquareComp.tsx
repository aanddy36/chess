import { Square } from "../classes/Square";
import { LastMove, SquareColor } from "../models";

interface Props {
  square: Square;
  handleMouseDown: (e: any) => void;
  handleMouseUp: (e: any) => void;
  firstSquare: Square | null;
  lastSquare: Square | null;
  lastMove: LastMove;
}

export const SquareComp = ({
  square,
  handleMouseDown,
  handleMouseUp,
  firstSquare,
  lastSquare,
  lastMove,
}: Props) => {
  const { squareId } = square;
  return (
    <div
      className={`w-16 h-16 font-semibold square ${
        square.color === SquareColor.WHITE
          ? squareId === firstSquare?.squareId ||
            squareId === lastSquare?.squareId ||
            squareId === lastMove.first ||
            squareId === lastMove.last
            ? "bg-whiteSelected"
            : "bg-whiteSquare"
          : squareId === firstSquare?.squareId ||
            squareId === lastSquare?.squareId ||
            squareId === lastMove.first ||
            squareId === lastMove.last
          ? "bg-greenSelected"
          : "bg-greenSquare"
      }`}
      key={squareId}
      id={squareId}
      onMouseDown={(e) => handleMouseDown(e as any)}
      onMouseUp={(e) => handleMouseUp(e as any)}
    >
      {square.piece && (
        <div
          className="w-16 h-16 bg-cover cursor-grab active:cursor-grabbing"
          id={squareId}
          data-piece
          style={{ backgroundImage: `url('${square.piece.image}')` }}
        ></div>
      )}
      {/* <div className="w-16 h-16 bg-selectedSquare/50"></div> */}
      {/* {square.gridPosition.x === 7 && (
                <div
                  className={`absolute bottom-1 right-1 ${
                    square.color === SquareColor.GREEN
                      ? "text-whiteSquare"
                      : "text-greenSquare"
                  }`}
                >
                  {square.chessPosition.x}
                </div>
              )}
              {square.gridPosition.y === 0 && (
                <div
                  className={`absolute top-1 left-1 ${
                    square.color === SquareColor.GREEN
                      ? "text-whiteSquare"
                      : "text-greenSquare"
                  }`}
                >
                  {square.chessPosition.y}
                </div>
              )} */}
    </div>
  );
};
