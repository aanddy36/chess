import { useEffect, useRef, useState } from "react";
import { createBoard } from "./utils/createBoard";
import { checkXLimits, checkYLimits } from "./utils/grabPiece";
import { SquareComp } from "./components/SquareComp";
import { Square } from "./classes/Square";
import { isValidMove } from "./utils/isValidMove";
import { LastMove } from "./models";

function App() {
  const [board, setBoard] = useState(createBoard());
  const [mouseActive, setMouseActive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const grabbedOne = useRef<HTMLDivElement | null>(null);
  const [firstSquare, setFirstSquare] = useState<Square | null>(null);
  const [lastSquare, setLastSquare] = useState<Square | null>(null);
  const [lastMoveIDs, setLastMoveIDs] = useState<LastMove>({
    first: null,
    last: null,
  });
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //console.log(board);
    if (lastSquare && firstSquare) {
      const isValid = isValidMove(board, firstSquare, lastSquare);
      if (isValid) {
        setBoard((prev) => {
          const temp = Square.movePiece(firstSquare, lastSquare, prev);
          return temp;
        });
        setLastMoveIDs({
          first: firstSquare.squareId,
          last: lastSquare.squareId,
        });
      } else {
        if (grabbedOne.current) {
          grabbedOne.current.style.position = `static`;
        }
      }
      grabbedOne.current = null;
      setFirstSquare(null);
      setLastSquare(null);
      /* console.log(firstSquare);
      console.log(lastSquare); */
    }
  }, [firstSquare, lastSquare]);

  useEffect(() => {
    if (grabbedOne.current) {
      const boardDimensions =
        boardRef.current?.getBoundingClientRect() as DOMRect;
      grabbedOne.current.style.position = `absolute`;
      grabbedOne.current.style.top = `${checkYLimits(
        boardDimensions,
        cursorPos.y
      )}px`;
      grabbedOne.current.style.left = `${checkXLimits(
        boardDimensions,
        cursorPos.x
      )}px`;
    }
  }, [cursorPos]);

  const handleMouseDown = (e: MouseEvent) => {
    let temp = e.target as HTMLDivElement;
    const selectedSquare = board.find((square) => square.squareId === temp.id);
    if (temp.dataset.piece) {
      grabbedOne.current = temp;
      setMouseActive(true);
      setFirstSquare(selectedSquare as Square);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const temp = elements.find((el) => el.classList.contains("square"));
    const selectedSquare = board.find((square) => square.squareId === temp?.id);

    if (grabbedOne.current) {
      if (selectedSquare) {
        setLastSquare(selectedSquare as Square);
      } else {
        grabbedOne.current.style.position = `static`;
        grabbedOne.current = null;
      }
      setMouseActive(false);
      setCursorPos({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    const watchCursor = (e: any) => {
      if (mouseActive) {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };
    document.addEventListener("mousemove", watchCursor);
    return () => {
      document.removeEventListener("mousemove", watchCursor);
    };
  }, [mouseActive]);
  return (
    <main className=" bg-bg w-screen h-screen grid place-content-center">
      <div
        className=" w-[512px] h-[512px] flex flex-wrap rounded-md overflow-hidden"
        ref={boardRef}
      >
        {board.map((square) => {
          return (
            <SquareComp
              key={square.squareId}
              square={square}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              firstSquare={firstSquare}
              lastSquare={lastSquare}
              lastMove={lastMoveIDs}
            />
          );
        })}
      </div>
    </main>
  );
}

export default App;
