import { useDispatch, useSelector } from "react-redux";
import { clockCaster } from "../utils/clockCaster";
import { RootState } from "../store";
import { SquareComp } from "./SquareComp";
import { PromotionMenu } from "./PromotionMenu";
import { IsValidType, Team } from "../types/models";
import { useEffect, useRef } from "react";
import { changeCursorPos } from "../features/chessboardSlice";
import { checkXLimits, checkYLimits } from "../utils/grabPiece";

export function Board({
  grabbedOne,
}: {
  grabbedOne: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const { board, cursorPos, mouseActive, moveStatus } = useSelector(
    (store: RootState) => store.chess
  );
  const { timer, GRID_SIZE, gameStarted, turn } = useSelector(
    (store: RootState) => store.settings
  );
  const boardRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const watchCursor = (e: any) => {
      const { offsetTop, offsetLeft } = boardRef.current as any;
      let clientX, clientY;
      if (e.type === "mousemove") {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.type === "touchmove") {
        e.preventDefault();
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      if (mouseActive) {
        dispatch(
          changeCursorPos({
            x: clientX - offsetLeft,
            y: clientY - offsetTop,
          })
        );
      }
    };

    document.addEventListener("mousemove", watchCursor);
    document.addEventListener("touchmove", watchCursor, { passive: false });

    return () => {
      document.removeEventListener("mousemove", watchCursor);
      document.removeEventListener("touchmove", watchCursor);
    };
  }, [mouseActive]);

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

  return (
    <section className=" flex flex-col h-full justify-center gap-3">
      <div className=" flex justify-between full:hidden">
        <div className=" flex items-start gap-3">
          <img
            src="/src/assets/black_user.png"
            className={`w-10 border-2 ${
              turn === Team.BLACK && gameStarted
                ? "border-[#f3f04b]"
                : "border-transparent"
            }`}
          />
          <h4 className=" text-white font-medium">Black</h4>
        </div>
        <button
          disabled
          className={`text-white text-xl py-1 font-semibold tracking-wider bg-blackBtn
      rounded-md h-full px-4 w-[110px] ${
        turn === Team.BLACK && gameStarted ? " opacity-100" : " opacity-50"
      }`}
        >
          {clockCaster(timer[Team.BLACK])}
        </button>
      </div>
      <div
        className="grid grid-cols-8 rounded-md relative overflow-hidden"
        ref={boardRef}
        style={{ height: `${GRID_SIZE * 8}px`, width: `${GRID_SIZE * 8}px` }}
      >
        {!gameStarted && (
          <div className=" absolute inset-0 bg-black/50 z-[1] grid place-content-center">
            <h2 className="text-white text-4xl tablet:text-5xl font-bold">
              Press Play to start!
            </h2>
          </div>
        )}
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
          <img
            src="/src/assets/white_user.png"
            className={`w-10 border-2 ${
              turn === Team.WHITE && gameStarted
                ? "border-[#f3f04b]"
                : "border-transparent"
            }`}
          />
          <h4 className=" text-white font-medium">White</h4>
        </div>
        <button
          disabled
          className={`text-blackBtn text-xl py-1 font-semibold tracking-wider bg-white
          rounded-md h-full px-4 w-[110px] ${
            turn === Team.WHITE && gameStarted ? " opacity-100" : " opacity-50"
          }`}
        >
          {clockCaster(timer[Team.WHITE])}
        </button>
      </div>
    </section>
  );
}
