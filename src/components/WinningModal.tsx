import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { confirmSurrender } from "../features/settingsSlice";
import { RootState } from "../store";
import { Team } from "../types/models";

export function WinningModal() {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(confirmSurrender(false));
  };
  const { winner } = useSelector((store: RootState) => store.settings);
  return (
    <section className="absolute inset-0 z-[900] bg-black/50">
      <div
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
    items-center z-[999] bg-bg shadow-md shadow-black/50 
    rounded-md grid grid-cols-1 text-white tablet:w-[375px]  w-[90%]"
      >
        <button
          className=" opacity-50 hover:opacity-100 transition-opacity duration-200"
          onClick={() => dispatch(confirmSurrender(false))}
        >
          <FaXmark className=" absolute top-4 right-3 scale-[1.5]" />
        </button>
        <div className="flex items-center gap-3 py-4 justify-center">
          <img src="/src/assets/trophy.png" className="w-12 h-12" />
          <div className=" flex flex-col items-center">
            <h4 className=" font-semibold text-2xl tablet:text-3xl text-center">
              {winner?.team === Team.WHITE ? "White" : "Black"} Won!
            </h4>
            <span className=" text-center font-medium opacity-80 text-base">
              for {winner?.reason}
            </span>
          </div>
        </div>
        <div className=" flex gap-3 bg-[#1d1c1a] w-full py-6 px-3">
          <button
            className=" py-2 rounded-md grow font-medium  text-base tablet:text-lg
             bg-timerBtn  transition-colors duration-200
              hover:bg-timerHover text-white/80"
            onClick={() => dispatch(confirmSurrender(false))}
          >
            New Game
          </button>
          <button
            className=" py-2 rounded-md font-medium  text-base tablet:text-lg grow
            bg-timerBtn  transition-colors duration-200
             hover:bg-timerHover text-white/80"
            onClick={handleConfirm}
          >
            Play Again
          </button>
        </div>
      </div>
    </section>
  );
}
