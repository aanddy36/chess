import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { confirmSurrender } from "../features/settingsSlice";

export function SurrenderModal() {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(confirmSurrender(false));
  };
  return (
    <section className="absolute inset-0 z-[900] bg-black/20">
      <div
        className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-8 
    items-center z-[999] px-6 laptop:px-12 tablet:py-6 bg-bg shadow-md shadow-black/30 
    rounded-md flex flex-col gap-3 text-white tablet:w-fit w-[90%]"
      >
        <button
          className=" opacity-50 hover:opacity-100 transition-opacity duration-200"
          onClick={() => dispatch(confirmSurrender(false))}
        >
          <FaXmark className=" absolute top-4 right-3 scale-[1.5]" />
        </button>
        <h4 className=" font-semibold text-xl laptop:text-3xl text-center">
          Are you sure you want to surrender?
        </h4>
        <h5 className=" text-base laptop:text-xl font-light opacity-80 text-center">
          It's <span className=" italic">white's</span> turn, so{" "}
          <span className=" text-[#db3d3d] italic font-medium">blacks</span>{" "}
          would win
        </h5>
        <div className=" flex gap-3 mt-3">
          <button
            className=" py-1 w-[100px] rounded-md font-medium  text-base laptop:text-xl
             bg-timerBtn border-[#363636] border-b-4 transition-colors duration-200
              hover:bg-timerHover"
            onClick={() => dispatch(confirmSurrender(false))}
          >
            Cancel
          </button>
          <button
            className=" py-1 w-[100px] rounded-md font-medium text-base laptop:text-xl bg-redBtn
             text-white transition-colors duration-200 hover:bg-redHover  border-b-4
              border-redBorder"
            onClick={handleConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </section>
  );
}
