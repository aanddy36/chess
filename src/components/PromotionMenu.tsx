import { FaXmark } from "react-icons/fa6";
import { IsValidType, MoveType, PiecesType, Team } from "../models";
import { LegacyRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { validateMove } from "../features/chessboardSlice";

interface Props {
  //promotionDec: LegacyRef<HTMLDivElement> | undefined;
}

export const PromotionMenu = (/* { promotionDec }: Props */) => {
  const { moveStatus, lastSquare } = useSelector(
    (store: RootState) => store.chess
  );
  const dispatch = useDispatch();
  const promotionDec = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { isValid, changeTeam } = moveStatus;
    if (isValid === IsValidType.IN_PROCESS) {
      if (promotionDec.current && lastSquare) {
        promotionDec.current.style.left = `${lastSquare.gridPosition.x * 64}px`;
        promotionDec.current.style.visibility = "visible";
        changeTeam === Team.BLACK
          ? (promotionDec.current.style.bottom = "0px")
          : (promotionDec.current.style.top = "0px");
      }
    }
  }, [moveStatus]);

  const selectPromPiece = (piece: PiecesType) => {
    if (piece === PiecesType.CANCEL) {
      dispatch(validateMove({ isValid: IsValidType.NO }));
    } else {
      dispatch(
        validateMove({
          isValid: IsValidType.YES,
          moveType: MoveType.PROMOTE,
          pieceToPromote: piece as PiecesType,
        })
      );
    }
  };
  return (
    <>
      <div
        className=" absolute inset-0 z-[1]"
        onClick={() => selectPromPiece(PiecesType.CANCEL)}
      ></div>
      <div
        ref={promotionDec}
        className={`border absolute z-[2] bg-white rounded-md flex w-16 overflow-hidden 
            shadow-md shadow-black/50 invisible ${
              moveStatus.changeTeam === Team.BLACK
                ? "flex-col-reverse"
                : "flex-col"
            }`}
      >
        <label
          className=" w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.QUEEN}
          style={{
            backgroundImage: `url('/src/assets/${moveStatus.changeTeam}q.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.QUEEN}
            onClick={(e) =>
              selectPromPiece((e.target as HTMLInputElement).id as PiecesType)
            }
          />
        </label>
        <label
          className="w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.KNIGHT}
          style={{
            backgroundImage: `url('/src/assets/${moveStatus.changeTeam}n.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.KNIGHT}
            onClick={(e) =>
              selectPromPiece((e.target as HTMLInputElement).id as PiecesType)
            }
          />
        </label>
        <label
          className="w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.ROOK}
          style={{
            backgroundImage: `url('/src/assets/${moveStatus.changeTeam}r.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.ROOK}
            onClick={(e) =>
              selectPromPiece((e.target as HTMLInputElement).id as PiecesType)
            }
          />
        </label>
        <label
          className="w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.BISHOP}
          style={{
            backgroundImage: `url('/src/assets/${moveStatus.changeTeam}b.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.BISHOP}
            onClick={(e) =>
              selectPromPiece((e.target as HTMLInputElement).id as PiecesType)
            }
          />
        </label>
        <label
          className=" bg-gray-200 p-2 grid place-content-center cursor-pointer opacity-55
         transition duration-200 hover:opacity-100 relative"
          htmlFor={PiecesType.CANCEL}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.CANCEL}
            onClick={(e) =>
              selectPromPiece((e.target as HTMLInputElement).id as PiecesType)
            }
          />
          <FaXmark className="scale-[1.3]" />
        </label>
      </div>
    </>
  );
};
