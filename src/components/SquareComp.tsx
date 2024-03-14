import { Square } from "../classes/Square";
import { LastMove, SquareColor } from "../models";

interface Props {
  square: Square;
  handleMouseDown: (e: any) => void;
  handleMouseUp: (e: any) => void;
  firstSquare: Square | null;
  lastMove: LastMove;
  hoveredSquare: string | null;
}

export const SquareComp = ({
  square,
  handleMouseDown,
  handleMouseUp,
  firstSquare,
  lastMove,
  hoveredSquare,
}: Props) => {
  const { squareId } = square;
  return (
    <div
      className={`w-16 h-16 font-semibold square border-[3px] ${
        square.color === SquareColor.WHITE
          ? squareId === firstSquare?.squareId ||
            squareId === lastMove.first ||
            squareId === lastMove.last
            ? "bg-whiteSelected border-whiteSelected"
            : "bg-whiteSquare border-whiteSquare"
          : squareId === firstSquare?.squareId ||
            squareId === lastMove.first ||
            squareId === lastMove.last
          ? "bg-greenSelected border-greenSelected"
          : "bg-greenSquare border-greenSquare"
      }  ${
        hoveredSquare === squareId &&
        square.color === SquareColor.WHITE &&
        " border-white"
      } ${
        hoveredSquare === squareId &&
        square.color === SquareColor.GREEN &&
        " border-[#cecece]"
      }`}
      key={squareId}
      id={squareId}
      onMouseDown={(e) => handleMouseDown(e as any)}
      onMouseUp={(e) => handleMouseUp(e as any)}
    >
      {square.piece && (
        <div
          className="w-[61px] h-[61px] bg-cover cursor-grab active:cursor-grabbing z-[1]"
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
