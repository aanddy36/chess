import { GameModes } from "../types/settingsTypes";
import { GiSilverBullet } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { changeSelectedSetting } from "../features/settingsSlice";

export const ModeSection = ({ name, vars }: GameModes) => {
  const { selectedSetting, gameStarted } = useSelector(
    (store: RootState) => store.settings
  );
  const dispatch = useDispatch();
  return (
    <section
      className={`flex flex-col gap-3 text-sm ${
        gameStarted ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className=" flex items-center text-white font-medium gap-3">
        {name === "Bullet" ? (
          <GiSilverBullet className="text-bulletLogo scale-[1.5]" />
        ) : name === "Blitz" ? (
          <AiFillThunderbolt className="text-blitzLogo scale-[1.5]" />
        ) : (
          <FaRegClock className="text-greenBorder scale-[1.3]" />
        )}
        {name}
      </div>
      <div className=" grid grid-cols-3 text-white font-medium gap-2 text-sm">
        {vars.map((gameVar) => (
          <button
            key={gameVar.name}
            className={`bg-timerBtn transition-colors
                  duration-200 rounded-md py-2 border-2 ${
                    gameVar.name === selectedSetting
                      ? " border-greenBorder"
                      : "border-timerBtn"
                  } ${
              gameStarted
                ? "disabled:opacity-60 cursor-auto"
                : gameVar.name === selectedSetting
                ? "hover:border-greenHover hover:bg-timerHover"
                : "hover:bg-timerHover hover:border-timerHover"
            }`}
            id={gameVar.name}
            disabled={gameStarted}
            onClick={(e: any) => dispatch(changeSelectedSetting(e.target.id))}
          >
            {gameVar.name}
          </button>
        ))}
      </div>
    </section>
  );
};
