import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { confirmSurrender, endGame } from "../features/settingsSlice";
import { RootState } from "../store";
import { Team } from "../types/models";
import { WReason } from "../types/settingsTypes";
import { otherTeam } from "../utils/coordCalculus";
import { end } from "../utils/playSounds";

export function SurrenderModal() {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(confirmSurrender(false));
    end()
    dispatch(endGame({team: otherTeam(turn), reason: WReason.ABANDONMENT}))
  };
  const { turn } = useSelector((store: RootState) => store.settings);
  return (
    <section className="absolute inset-0 z-[900] bg-black/50">
      <div
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
    items-center z-[999] bg-bg shadow-md shadow-black/30
    rounded-md grid grid-cols-1 text-white tablet:w-[475px] w-[90%]"
      >
        <button
          className=" opacity-50 hover:opacity-100 transition-opacity duration-200"
          onClick={() => dispatch(confirmSurrender(false))}
        >
          <FaXmark className=" absolute top-4 right-3 scale-[1.5]" />
        </button>

        <h4 className=" font-semibold text-2xl tablet:text-3xl text-center  py-7 px-4 ">
          Are you sure you want to surrender?
        </h4>
        <div className="flex flex-col items-center gap-4 py-7 bg-[#1d1c1a]">
          <span className=" text-center font-medium opacity-80  text-lg">
            It's{" "}
            <span className=" italic">
              {turn === Team.WHITE ? "white" : "black"}'s
            </span>{" "}
            turn, so{" "}
            <span className=" text-[#db3d3d] italic font-medium">
              {turn === Team.WHITE ? "black" : "white"}
            </span>{" "}
            would win
          </span>
          <div className=" flex gap-3 w-full px-4">
            <button
              className=" py-2 w-[100px] rounded-md font-medium  text-base tablet:text-lg
             bg-timerBtn border-[#363636] transition-colors duration-200 grow
              hover:bg-timerHover"
              onClick={() => dispatch(confirmSurrender(false))}
            >
              Cancel
            </button>
            <button
              className=" py-2 w-[100px] rounded-md font-medium text-base tablet:text-lg bg-redBtn
             text-white transition-colors duration-200 hover:bg-redHover grow"
              onClick={(handleConfirm)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
