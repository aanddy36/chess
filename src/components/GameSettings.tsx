import { FaChevronDown, FaRegClock } from "react-icons/fa6";
import { GiSilverBullet } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import { Modes, gameModes } from "../types/settingsTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { ModeSection } from "./ModeSection";
import { confirmSurrender, startGame } from "../features/settingsSlice";

export const GameSettings = () => {
  const { selectedSetting, mode, gameStarted } = useSelector(
    (store: RootState) => store.settings
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <section
      className=" bg-[#262522] flex flex-col justify-between p-4 laptop:w-60 rounded-md 
      full:h-[600px] laptop:h-[97vh] h-fit w-[94%] m-4 laptop:m-0 gap-4"
    >
      <article className=" laptop:hidden flex flex-col gap-6">
        <button
          className="text-white font-medium bg-timerBtn py-4 rounded-md justify-center
       duration-200 transition-colors hover:bg-timerHover flex items-center px-4
        text-xl w-full relative"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <div className=" flex justify-center items-center gap-4">
            {mode === Modes.BULLET ? (
              <GiSilverBullet className="text-bulletLogo scale-[1.5]" />
            ) : mode === Modes.BLITZ ? (
              <AiFillThunderbolt className="text-blitzLogo scale-[1.5]" />
            ) : (
              <FaRegClock className="text-greenBorder scale-[1.3]" />
            )}
            <span className="text-xl">{selectedSetting}</span>
          </div>
          <FaChevronDown
            className={`absolute right-4 transition-transform duration-200
           ${isDropdownOpen ? " rotate-180" : "rotate-0"}`}
          />
        </button>
        {isDropdownOpen &&
          gameModes.map((mode) => {
            const { name, vars } = mode;
            return <ModeSection name={name} vars={vars} key={name} />;
          })}
      </article>
      <article className="hidden laptop:flex flex-col gap-6">
        <div
          className=" text-white font-medium bg-timerBtn py-4 rounded-md justify-center
       duration-200 transition-colors hover:bg-timerHover flex items-center gap-4
        text-xl"
        >
          {mode === Modes.BULLET ? (
            <GiSilverBullet className="text-bulletLogo scale-[1.5]" />
          ) : mode === Modes.BLITZ ? (
            <AiFillThunderbolt className="text-blitzLogo scale-[1.5]" />
          ) : (
            <FaRegClock className="text-greenBorder scale-[1.3]" />
          )}
          {selectedSetting}
        </div>
        {gameModes.map((mode) => {
          const { name, vars } = mode;
          return <ModeSection name={name} vars={vars} key={name} />;
        })}
      </article>
      {!gameStarted ? (
        <button
          className=" bg-greenBorder text-white text-2xl font-bold rounded-md w-full
       py-3 border-b-8 border-greenSquare transition-color duration-200
        hover:bg-greenHover"
          onClick={() => dispatch(startGame())}
        >
          Jugar
        </button>
      ) : (
        <button
          className=" bg-redBtn text-white text-2xl font-bold rounded-md w-full
       py-3 border-b-8 border-redBorder transition-color duration-200 hover:bg-redHover"
          onClick={() => dispatch(confirmSurrender(true))}
        >
          Surrender
        </button>
      )}
    </section>
  );
};
