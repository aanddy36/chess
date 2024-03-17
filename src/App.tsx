import { useEffect, useRef, useState } from "react";
import { createBoard } from "./utils/createBoard";
import { checkXLimits, checkYLimits } from "./utils/grabPiece";
import { SquareComp } from "./components/SquareComp";
import { Square } from "./classes/Square";
import { isValidMove } from "./utils/isValidMove";
import {
  IsValidType,
  LastMove,
  MoveType,
  PiecesType,
  Team,
  Validness,
  initialState,
} from "./models";
import { arraySounds } from "./utils/playSounds";
import { PromotionMenu } from "./components/PromotionMenu";
import { movePiece } from "./utils/movePiece";
import { uptDangerZones } from "./utils/uptDangerZones";

function App() {
  const [board, setBoard] = useState<Square[]>([]);
  const [mouseActive, setMouseActive] = useState(false);
  const [cursorPos, setCursorPos] = useState(initialState.cursorPos);
  const grabbedOne = useRef<HTMLDivElement | null>(null);
  const [firstSquare, setFirstSquare] = useState<Square | null>(null);
  const [lastSquare, setLastSquare] = useState<Square | null>(null);
  const [lastMoveIDs, setLastMoveIDs] = useState<LastMove>(
    initialState.lastMoveIDs
  );
  const [isValidObj, setIsValidObj] = useState<Validness>(initialState.isValid);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const promotionDec = useRef<HTMLDivElement | null>(null);
  const [piecePromoted, setPiecePromoted] = useState<PiecesType | null>(null);
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  useEffect(() => {
    let myBoard = createBoard();
    setBoard(myBoard);
  }, []);

  useEffect(() => {
    const { isValid, changeTeam, moveType } = isValidObj;
    if (isValid !== IsValidType.NULL && firstSquare && lastSquare) {
      switch (isValid) {
        case IsValidType.YES:
          let { uptBoard } = isValidObj;
          if (!uptBoard) {
            const {
              changeProp,
              changeTeam,
              capturedInPassant,
              pieceToPromote,
            } = isValidObj;
            let temp = [...board];
            let newBoard = movePiece(firstSquare, lastSquare, temp, {
              prop: changeProp,
              changeTeam,
              capturedInPassant,
              pieceToPromote,
            });
            uptBoard = uptDangerZones(newBoard);
          }

          setBoard(uptBoard as Square[]);
          setLastMoveIDs({
            first: firstSquare.squareId,
            last: lastSquare.squareId,
          });
          moveType !== undefined && arraySounds[moveType]();
          break;

        case IsValidType.NO:
          if (grabbedOne.current) {
            grabbedOne.current.style.position = `static`;
          }
          break;

        case IsValidType.IN_PROCESS:
          if (piecePromoted) {
            if (piecePromoted === PiecesType.CANCEL) {
              setIsValidObj({ isValid: IsValidType.NO });
            } else {
              setIsValidObj({
                isValid: IsValidType.YES,
                moveType: MoveType.PROMOTE,
                pieceToPromote: piecePromoted,
              });
            }
            setPiecePromoted(null);
          }
          if (promotionDec.current) {
            promotionDec.current.style.left = `${
              lastSquare.gridPosition.x * 64
            }px`;
            promotionDec.current.style.visibility = "visible";
            changeTeam === Team.BLACK
              ? (promotionDec.current.style.bottom = "0px")
              : (promotionDec.current.style.top = "0px");
          }
          break;
      }
      if (isValid !== IsValidType.IN_PROCESS) {
        grabbedOne.current = null;
        setFirstSquare(null);
        setLastSquare(null);
      }
    }
  }, [isValidObj, piecePromoted]);

  useEffect(() => {
    if (lastSquare && firstSquare) {
      setIsValidObj(isValidMove(board, firstSquare, lastSquare));
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
    setHoveredSquare(null);
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
      setCursorPos(initialState.cursorPos);
    }
  };

  const selectPromotion = (e: React.MouseEvent<HTMLInputElement>) => {
    setPiecePromoted((e.target as HTMLInputElement).id as PiecesType);
  };

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

        setCursorPos({ x: e.clientX - offsetLeft, y: e.clientY - offsetTop });
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
        className=" w-[512px] h-[512px] flex flex-wrap rounded-md relative overflow-hidden"
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
              lastMove={lastMoveIDs}
              hoveredSquare={hoveredSquare}
            />
          );
        })}
        {isValidObj.isValid === IsValidType.IN_PROCESS && (
          <PromotionMenu
            selectPromotion={selectPromotion}
            isValidObj={isValidObj}
            setPiecePromoted={setPiecePromoted}
            promotionDec={promotionDec}
          />
        )}
      </div>
    </main>
  );
}

export default App;
