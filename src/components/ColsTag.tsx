import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SquareColor, SquareType } from "../types/models";

export function ColsTag({ square }: { square: SquareType }) {
  const { GRID_SIZE } = useSelector((store: RootState) => store.settings);
  return (
    <span
      className={` absolute bottom-[1px] ${
        square.color === SquareColor.GREEN
          ? "text-whiteSquare"
          : "text-greenSquare"
      }`}
      style={{
        left: `${
          square.gridPosition.x * GRID_SIZE + GRID_SIZE - GRID_SIZE / 5
        }px`,
        fontSize: `${GRID_SIZE / 4}px`,
      }}
    >
      {square.chessPosition.x}
    </span>
  );
}
