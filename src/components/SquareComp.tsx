import { useDispatch, useSelector } from "react-redux";
import { SquareColor, SquareType } from "../types/models";
import { RootState } from "../store";
import {
  activeMouse,
  assignFirstSq,
  assignLastSq,
  changeCursorPos,
} from "../features/chessboardSlice";
import { RowsTag } from "./RowsTag";
import { ColsTag } from "./ColsTag";

interface Props {
  square: SquareType;
  grabbedOne: React.MutableRefObject<HTMLDivElement | null>;
}

export const SquareComp = ({ square, grabbedOne }: Props) => {
  const { squareId } = square;
  const { firstSquare, lastMoveIDs, board } = useSelector(
    (store: RootState) => store.chess
  );
  const { GRID_SIZE } = useSelector((store: RootState) => store.settings);
  const dispatch = useDispatch();

  const handleMouseDown = (e: MouseEvent) => {
    let temp = e.target as HTMLDivElement;
    const selectedSquare = board.find((square) => square.squareId === temp.id);

    if (temp.dataset.piece) {
      grabbedOne.current = temp;
      dispatch(activeMouse(true));
      dispatch(assignFirstSq(selectedSquare as SquareType));
    }
  };

  const handleMouseUp = (e: any, isMouse: boolean) => {
    let elements;
    if (isMouse) {
      elements = document.elementsFromPoint(e.clientX, e.clientY);
    } else {
      var { clientX, clientY } = e.changedTouches[0];
      elements = document.elementsFromPoint(clientX, clientY);
    }
    const temp = elements.find((el) => el.classList.contains("square"));
    const selectedSquare = board.find((square) => square.squareId === temp?.id);

    if (grabbedOne.current) {
      if (selectedSquare) {
        dispatch(assignLastSq(selectedSquare as SquareType));
      } else {
        grabbedOne.current.style.position = `static`;
        grabbedOne.current = null;
      }
      dispatch(activeMouse(false));
      dispatch(changeCursorPos(null));
    }
  };

  return (
    <div
      className={`font-semibold square ${
        square.color === SquareColor.WHITE
          ? squareId === firstSquare?.squareId ||
            squareId === lastMoveIDs.first ||
            squareId === lastMoveIDs.last
            ? "bg-whiteSelected"
            : "bg-whiteSquare"
          : squareId === firstSquare?.squareId ||
            squareId === lastMoveIDs.first ||
            squareId === lastMoveIDs.last
          ? "bg-greenSelected"
          : "bg-greenSquare"
      }   `} 
      style={{ height: `${GRID_SIZE}px`, width: `${GRID_SIZE}px` }}
      key={squareId}
      id={squareId}
      onMouseDown={(e) => handleMouseDown(e as any)}
      onMouseUp={(e) => handleMouseUp(e as any, true)}
      onTouchStart={(e) => handleMouseDown(e as any)}
      onTouchEnd={(e) => handleMouseUp(e as any, false)}
    >
      {square.piece && (
        <div
          className={`bg-cover cursor-grab active:cursor-grabbing z-[1]`}
          id={squareId}
          data-piece
          style={{
            backgroundImage: `url('${square.piece.image}')`,
            height: `${GRID_SIZE}px`,
            width: `${GRID_SIZE}px`,
          }}
        ></div>
      )}
      {square.gridPosition.y === 7 && <ColsTag square={square} />}
      {square.gridPosition.x === 0 && <RowsTag square={square} />}
    </div>
  );
};
