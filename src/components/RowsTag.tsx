import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SquareColor, SquareType } from "../types/models";

export function RowsTag({ square }: { square: SquareType }) {
  const { GRID_SIZE } = useSelector((store: RootState) => store.settings);
  return (
    <span
      className={`absolute left-1 font-medium  ${
        square.color === SquareColor.GREEN
          ? "text-whiteSquare"
          : "text-greenSquare"
      }`}
      style={{
        top: `${square.gridPosition.y * GRID_SIZE}px`,
        fontSize: `${GRID_SIZE / 4}px`,
      }}
    >
      {square.chessPosition.y}
    </span>
  );
}
