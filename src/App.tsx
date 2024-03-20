import { useEffect, useRef } from "react";
import { checkXLimits, checkYLimits } from "./utils/grabPiece";
import { SquareComp } from "./components/SquareComp";
import { isValidMove } from "./utils/isValidMove";
import { IsValidType } from "./types/models";
import { PromotionMenu } from "./components/PromotionMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import {
  changeCursorPos,
  createBoard,
  validateMove,
} from "./features/chessboardSlice";
import { GameSettings } from "./components/GameSettings";
import { FullSizeTurns } from "./components/FullSizeTurns";
import { clockCaster } from "./utils/clockCaster";
import { adjustSize } from "./features/settingsSlice";

function App() {
  const grabbedOne = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const { board, firstSquare, lastSquare, cursorPos, mouseActive, moveStatus } =
    useSelector((store: RootState) => store.chess);
  const { duration, GRID_SIZE } = useSelector(
    (store: RootState) => store.settings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBoard());
  }, []);

  useEffect(() => {
    const { isValid } = moveStatus;

    if (isValid === IsValidType.YES) {
      grabbedOne.current = null;
    } else if (isValid === IsValidType.NO) {
      if (grabbedOne.current) {
        grabbedOne.current.style.position = `static`;
      }
      grabbedOne.current = null;
    }
  }, [moveStatus]);

  useEffect(() => {
    if (lastSquare && firstSquare) {
      dispatch(validateMove(isValidMove(board, firstSquare, lastSquare)));
    }
  }, [firstSquare, lastSquare]);

  useEffect(() => {
    if (grabbedOne.current && cursorPos) {
      const boardDimensions =
        boardRef.current?.getBoundingClientRect() as DOMRect;
      grabbedOne.current.style.position = `absolute`;
      const { offsetTop, offsetLeft } = boardRef.current as HTMLDivElement;
      grabbedOne.current.style.top = `${checkYLimits(
        boardDimensions,
        cursorPos.y,
        offsetTop
      )}px`;
      grabbedOne.current.style.left = `${checkXLimits(
        boardDimensions,
        cursorPos.x,
        offsetLeft
      )}px`;
    }
  }, [cursorPos]);

  useEffect(() => {
    const watchCursor = (e: any) => {
      const { offsetTop, offsetLeft } = boardRef.current as HTMLDivElement;
      if (mouseActive) {
        dispatch(
          changeCursorPos({
            x: e.clientX - offsetLeft,
            y: e.clientY - offsetTop,
          })
        );
      }
    };
    document.addEventListener("mousemove", watchCursor);
    return () => {
      document.removeEventListener("mousemove", watchCursor);
    };
  }, [mouseActive]);

  useEffect(() => {
    const watchCursor = (e: TouchEvent) => {
      const { offsetTop, offsetLeft } = boardRef.current as HTMLDivElement;
      if (mouseActive) {
        e.preventDefault();
        var { clientX, clientY } = e.touches[0];
        dispatch(
          changeCursorPos({
            x: clientX - offsetLeft,
            y: clientY - offsetTop,
          })
        );
      }
    };
    document.addEventListener("touchmove", watchCursor, { passive: false });
    return () => {
      document.removeEventListener("touchmove", watchCursor);
    };
  }, [mouseActive]);

  useEffect(() => {
    const adjustGridSize = () => {
      if (window.innerWidth > 1050 && GRID_SIZE !== 75) {
        return dispatch(adjustSize(75));
      } else if (
        window.innerWidth < 1050 &&
        window.innerWidth >= 570 &&
        GRID_SIZE !== 64
      ) {
        return dispatch(adjustSize(64));
      } else if (window.innerWidth < 570) {
        return dispatch(adjustSize(window.innerWidth * 0.10256 + 5.5));
      }
    };
    window.addEventListener("resize", adjustGridSize);
    return () => {
      window.removeEventListener("resize", adjustGridSize);
    };
  }, [GRID_SIZE]);

  return (
    <main
      className=" bg-bg min-h-screen flex flex-col items-center justify-between pt-4 laptop:pt-0
    laptop:px-4 semi:justify-center semi:gap-12 laptop:flex-row gap-12 laptop:gap-3"
    >
      <FullSizeTurns />

      <section className=" flex flex-col h-full justify-center gap-3">
        <div className=" flex justify-between full:hidden">
          <div className=" flex items-start gap-3">
            <img src="/src/assets/black_user.png" className=" w-10" />
            <h4 className=" text-white font-medium">Black</h4>
          </div>
          <button
            disabled
            className="text-white text-2xl font-semibold tracking-wider bg-blackBtn
            rounded-md opacity-50 h-full px-4"
          >
            {clockCaster(duration)}
          </button>
        </div>
        <div
          className="grid grid-cols-8 rounded-md relative overflow-hidden"
          ref={boardRef}
          style={{ height: `${GRID_SIZE * 8}px`, width: `${GRID_SIZE * 8}px` }}
        >
          {board.map((square) => {
            return (
              <SquareComp
                key={square.squareId}
                square={square}
                grabbedOne={grabbedOne}
              />
            );
          })}
          {moveStatus.isValid === IsValidType.IN_PROCESS && <PromotionMenu />}
        </div>
        <div className=" flex justify-between full:hidden">
          <div className=" flex items-start gap-3">
            <img src="/src/assets/white_user.png" className=" w-10" />
            <h4 className=" text-white font-medium">White</h4>
          </div>
          <button
            disabled
            className="text-blackBtn text-2xl font-semibold tracking-wider bg-white 
            rounded-md opacity-50 h-full px-4"
          >
            {clockCaster(duration)}
          </button>
        </div>
      </section>

      <GameSettings />
    </main>
  );
}

export default App;
