import { useEffect, useRef } from "react";
import { isValidMove } from "./utils/isValidMove";
import { IsValidType } from "./types/models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { createBoard, validateMove } from "./features/chessboardSlice";
import { GameSettings } from "./components/GameSettings";
import { FullSizeTurns } from "./components/FullSizeTurns";
import { adjustSize } from "./features/settingsSlice";
import { Board } from "./components/Board";
import { SurrenderModal } from "./components/SurrenderModal";

function App() {
  const grabbedOne = useRef<HTMLDivElement | null>(null);

  const { board, firstSquare, lastSquare, moveStatus } = useSelector(
    (store: RootState) => store.chess
  );
  const { GRID_SIZE, isSurrendering } = useSelector(
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
    laptop:px-4 semi:justify-center semi:gap-12 laptop:flex-row gap-12 laptop:gap-3 relative"
    >
      {isSurrendering && <SurrenderModal />}
      <FullSizeTurns />
      <Board grabbedOne={grabbedOne} />
      <GameSettings />
    </main>
  );
}

export default App;
