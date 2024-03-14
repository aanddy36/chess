import { FaXmark } from "react-icons/fa6";
import { PiecesType, Team, Validness } from "../models";
import { LegacyRef } from "react";

interface Props {
  setPiecePromoted: (arg: PiecesType) => void;
  promotionDec: LegacyRef<HTMLDivElement> | undefined;
  isValidObj: Validness;
  selectPromotion: (arg: any) => void;
}

export const PromotionMenu = ({
  setPiecePromoted,
  promotionDec,
  isValidObj,
  selectPromotion,
}: Props) => {
  return (
    <>
      <div
        className=" absolute inset-0 z-[1]"
        onClick={() => setPiecePromoted(PiecesType.CANCEL)}
      ></div>
      <div
        ref={promotionDec}
        className={`border absolute z-[2] bg-white rounded-md flex w-16 overflow-hidden 
            shadow-md shadow-black/50 invisible ${
              isValidObj.changeTeam === Team.BLACK
                ? "flex-col-reverse"
                : "flex-col"
            }`}
      >
        <label
          className=" w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.QUEEN}
          style={{
            backgroundImage: `url('/src/assets/${isValidObj.changeTeam}q.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.QUEEN}
            onClick={(e) => selectPromotion(e)}
          />
        </label>
        <label
          className="w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.KNIGHT}
          style={{
            backgroundImage: `url('/src/assets/${isValidObj.changeTeam}n.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.KNIGHT}
            onClick={(e) => selectPromotion(e)}
          />
        </label>
        <label
          className="w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.ROOK}
          style={{
            backgroundImage: `url('/src/assets/${isValidObj.changeTeam}r.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.ROOK}
            onClick={(e) => selectPromotion(e)}
          />
        </label>
        <label
          className="w-16 h-16 bg-cover cursor-pointer transition duration-200
           hover:bg-gray-200 relative"
          htmlFor={PiecesType.BISHOP}
          style={{
            backgroundImage: `url('/src/assets/${isValidObj.changeTeam}b.png')`,
          }}
        >
          <input
            name="promotion"
            className=" absolute inset-0 invisible"
            id={PiecesType.BISHOP}
            onClick={(e) => selectPromotion(e)}
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
            onClick={(e) => selectPromotion(e)}
          />
          <FaXmark className="scale-[1.3]" />
        </label>
      </div>
    </>
  );
};
