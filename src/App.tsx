import { useEffect, useRef, useState } from "react";
import { checkXLimits, checkYLimits } from "./utils/grabPiece";
import { SquareComp } from "./components/SquareComp";
import { isValidMove } from "./utils/isValidMove";
import { IsValidType } from "./models";
import { PromotionMenu } from "./components/PromotionMenu";
import { FaAngleDown, FaRegClock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import {
  changeCursorPos,
  createBoard,
  validateMove,
} from "./features/chessboardSlice";

function App() {
  const grabbedOne = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  const { board, firstSquare, lastSquare, cursorPos, mouseActive, moveStatus } =
    useSelector((store: RootState) => store.chess);
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
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const temp = elements.find((el) => el.classList.contains("square"));
        const selectedSquare = board.find(
          (square) => square.squareId === temp?.id
        );
        if (hoveredSquare !== selectedSquare?.squareId && selectedSquare) {
          setHoveredSquare(selectedSquare?.squareId);
        }
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

  return (
    <main
      className=" bg-bg w-screen h-screen flex items-center justify-center gap-8
       flex-col"
    >
      <h1 className=" text-white font-extrabold text-5xl">playChess</h1>
      <section className=" flex items-center justify-center gap-12">
        <section className="h-[512px] flex flex-col justify-between gap-6">
          <div className=" h-full flex flex-col justify-between">
            <div className="flex flex-col gap-2 items-center">
              <img
                src="/src/assets/black_user.png"
                className=" w-24 rounded-md"
              />
              <h4 className=" text-white font-medium">Black</h4>
            </div>
            <button
              disabled
              className="text-white text-2xl font-semibold tracking-wider bg-blackBtn
            w-full py-1 rounded-md border-b-[5px] border-greenBorder opacity-50"
            >
              10:00
            </button>
          </div>
          <div className=" h-full flex flex-col-reverse justify-between">
            <div className="flex flex-col gap-2 items-center">
              <h4 className=" text-white font-medium">White</h4>
              <img
                src="/src/assets/white_user.png"
                className=" w-24 rounded-md"
              />
            </div>
            <button
              disabled
              className="text-blackBtn text-2xl font-semibold tracking-wider bg-white 
            w-full py-1 rounded-md border-t-[5px] border-greenBorder opacity-50"
            >
              10:00
            </button>
          </div>
        </section>

        <div
          className=" w-[512px] h-[512px] flex flex-wrap rounded-md relative overflow-hidden"
          ref={boardRef}
        >
          {board.map((square) => {
            return (
              <SquareComp
                key={square.squareId}
                square={square}
                grabbedOne={grabbedOne}
                hoveredSquare={hoveredSquare}
                setHoveredSquare={setHoveredSquare}
              />
            );
          })}
          {moveStatus.isValid === IsValidType.IN_PROCESS && <PromotionMenu />}
        </div>

        <div className=" flex flex-col w-32 gap-4">
          <button
            className=" text-white font-medium bg-timerBtn py-2 rounded-md justify-between
           duration-200 transition-colors hover:bg-timerHover flex items-center pr-2 pl-4"
          >
            <div className=" flex items-center gap-2">
              <FaRegClock className=" text-greenBorder" />
              10 min
            </div>
            <FaAngleDown />
          </button>
          <button
            className=" bg-greenBorder text-white text-xl font-bold rounded-md
           py-[6px] border-b-[5px] border-greenSquare transition-color duration-200
            hover:bg-greenHover"
          >
            Jugar
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
