import { Square } from "../classes/Square";
import { SquareColor } from "../models";

interface Props {
  square: Square;
  handleMouseDown: (e: any) => void;
  handleMouseUp: (e: any) => void;
}

export const SquareComp = ({
  square,
  handleMouseDown,
  handleMouseUp,
}: Props) => {
  return (
    <div
      className={`w-16 h-16 font-semibold square ${
        square.color === SquareColor.WHITE ? "bg-whiteSquare" : "bg-greenSquare"
      }`}
      key={square.squareId}
      id={square.squareId}
      onMouseDown={(e) => handleMouseDown(e as any)}
      onMouseUp={(e) => handleMouseUp(e as any)}
    >
      {square.piece && (
        <div
          className="w-16 h-16 bg-cover cursor-grab active:cursor-grabbing"
          id={square.squareId}
          data-piece
          style={{ backgroundImage: `url('${square.piece.image}')` }}
        ></div>
      )}
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
