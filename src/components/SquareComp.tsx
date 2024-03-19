import { useDispatch, useSelector } from "react-redux";
import { Square } from "../classes/Square";
import { SquareColor } from "../models";
import { RootState } from "../store";
import {
  activeMouse,
  assignFirstSq,
  assignLastSq,
  changeCursorPos,
} from "../features/chessboardSlice";

interface Props {
  square: Square;
  grabbedOne: React.MutableRefObject<HTMLDivElement | null>;
  hoveredSquare: string | null;
  setHoveredSquare: (arg: string | null) => void;
}

export const SquareComp = ({
  square,
  grabbedOne,
  hoveredSquare,
  setHoveredSquare,
}: Props) => {
  const { squareId } = square;
  const { firstSquare, lastMoveIDs, board } = useSelector(
    (store: RootState) => store.chess
  );
  const dispatch = useDispatch();

  const handleMouseDown = (e: MouseEvent) => {
    let temp = e.target as HTMLDivElement;
    const selectedSquare = board.find((square) => square.squareId === temp.id);
    
    if (temp.dataset.piece) {
      console.log(selectedSquare);
      grabbedOne.current = temp;
      dispatch(activeMouse(true));
      dispatch(assignFirstSq(selectedSquare as Square));
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setHoveredSquare(null);
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const temp = elements.find((el) => el.classList.contains("square"));
    const selectedSquare = board.find((square) => square.squareId === temp?.id);

    if (grabbedOne.current) {
      if (selectedSquare) {
        dispatch(assignLastSq(selectedSquare as Square));
        //setLastSquare(selectedSquare as Square);
      } else {
        grabbedOne.current.style.position = `static`;
        grabbedOne.current = null;
      }
      dispatch(activeMouse(false));
      dispatch(changeCursorPos(null));
      //setMouseActive(false);
      //setCursorPos(initialState.cursorPos);
    }
  };

  return (
    <div
      className={`w-16 h-16 font-semibold square ${
        square.color === SquareColor.WHITE
          ? squareId === firstSquare?.squareId ||
            squareId === lastMoveIDs.first ||
            squareId === lastMoveIDs.last
            ? "bg-whiteSelected border-whiteSelected"
            : "bg-whiteSquare border-whiteSquare"
          : squareId === firstSquare?.squareId ||
            squareId === lastMoveIDs.first ||
            squareId === lastMoveIDs.last
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
          className="w-16 h-16 bg-cover cursor-grab active:cursor-grabbing z-[1]"
          id={squareId}
          data-piece
          style={{ backgroundImage: `url('${square.piece.image}')` }}
        ></div>
      )}
      {square.gridPosition.y === 7 && (
        <span
          className={` absolute bottom-[1px] ${
            square.color === SquareColor.GREEN
              ? "text-whiteSquare"
              : "text-greenSquare"
          }`}
          style={{ left: `${square.gridPosition.x * 64 + 52}px` }}
        >
          {square.chessPosition.x}
        </span>
      )}
      {square.gridPosition.x === 0 && (
        <span
          className={`absolute left-1 ${
            square.color === SquareColor.GREEN
              ? "text-whiteSquare"
              : "text-greenSquare"
          }`}
          style={{ top: `${square.gridPosition.y * 64}px` }}
        >
          {square.chessPosition.y}
        </span>
      )}
    </div>
  );
};
