import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clockCaster } from "../utils/clockCaster";
import { Team } from "../types/models";
import { useEffect } from "react";
import { endGame, updateTimer } from "../features/settingsSlice";
import { WReason } from "../types/settingsTypes";
import { otherTeam } from "../utils/coordCalculus";

export const FullSizeTurns = () => {
  const { timer, GRID_SIZE, turn, gameStarted } = useSelector(
    (store: RootState) => store.settings
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let setTimer = 0;
    if (gameStarted) {
      setTimer = setInterval(() => {
        dispatch(updateTimer(turn));

        /* if (turn === Team.WHITE) {
          console.log(timer.w);
        } else {
          console.log(timer.b);
        } */
      }, 1000);
    }
    return () => {
      if (setTimer) {
        clearInterval(setTimer);
      }
    };
  }, [turn, gameStarted]);

  useEffect(() => {
    if (timer[turn] === 0) {
      dispatch(endGame({ team: otherTeam(turn), reason: WReason.TIME }));
    }
  }, [timer]);
  return (
    <section
      className="flex-col justify-between gap-6 hidden full:flex"
      style={{ height: `${GRID_SIZE * 8}px` }}
    >
      <div className={`h-full flex flex-col justify-between`}>
        <div className="flex flex-col gap-2 items-center">
          <img
            src="/src/assets/black_user.png"
            className={`w-24 rounded-md border-2 ${
              turn === Team.BLACK && gameStarted
                ? "border-[#f3f04b]"
                : "border-transparent"
            }`}
          />
          <h4 className=" text-white font-medium">Black</h4>
        </div>
        <button
          disabled
          className={`text-white text-2xl font-semibold tracking-wider bg-blackBtn
            w-[126px] py-1 rounded-md border-b-[5px] border-greenBorder ${
              turn === Team.BLACK && gameStarted
                ? " opacity-100"
                : " opacity-50"
            }`}
        >
          {clockCaster(timer[Team.BLACK])}
        </button>
      </div>
      <div className=" h-full flex flex-col-reverse justify-between">
        <div className="flex flex-col gap-2 items-center">
          <h4 className=" text-white font-medium">White</h4>
          <img
            src="/src/assets/white_user.png"
            className={`w-24 rounded-md border-2 ${
              turn === Team.WHITE && gameStarted
                ? "border-[#f3f04b]"
                : "border-transparent"
            }`}
          />
        </div>
        <button
          disabled
          className={`text-black text-2xl font-semibold tracking-wider bg-white 
            w-[126px] py-1 rounded-md border-t-[5px] border-greenBorder ${
              turn === Team.WHITE && gameStarted
                ? " opacity-100"
                : " opacity-50"
            }`}
        >
          {clockCaster(timer[Team.WHITE])}
        </button>
      </div>
    </section>
  );
};
