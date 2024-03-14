import { Square } from "../classes/Square";
import { LastMove, SquareColor } from "../models";

interface Props {
  square: Square;
  handleMouseDown: (e: any) => void;
  handleMouseUp: (e: any) => void;
  firstSquare: Square | null;
  lastMove: LastMove;
}

export const SquareComp = ({
  square,
  handleMouseDown,
  handleMouseUp,
  firstSquare,
  lastMove,
}: Props) => {
  const { squareId } = square;
  return (
    <div
      className={`w-16 h-16 font-semibold square ${
        square.color === SquareColor.WHITE
          ? squareId === firstSquare?.squareId ||
            squareId === lastMove.first ||
            squareId === lastMove.last
            ? "bg-whiteSelected"
            : "bg-whiteSquare"
          : squareId === firstSquare?.squareId ||
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
          className="w-16 h-16 bg-cover cursor-grab active:cursor-grabbing z-[1]"
          id={squareId}
          data-piece
          style={{ backgroundImage: `url('${square.piece.image}')` }}
        ></div>
      )}
      {square.gridPosition.x === 7 && (
        <span
          className={` absolute bottom-[1px] ${
            square.color === SquareColor.GREEN
              ? "text-whiteSquare"
              : "text-greenSquare"
          }`}
          style={{ left: `${square.gridPosition.y * 64 + 52}px` }}
        >
          {square.chessPosition.x}
        </span>
      )}
      {square.gridPosition.y === 0 && (
        <span
          className={`absolute left-1 ${
            square.color === SquareColor.GREEN
              ? "text-whiteSquare"
              : "text-greenSquare"
          }`}
          style={{ top: `${square.gridPosition.x * 64}px` }}
        >
          {square.chessPosition.y}
        </span>
      )}
    </div>
  );
};