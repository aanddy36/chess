import { useSelector } from "react-redux";
import { RootState } from "../store";
import { clockCaster } from "../utils/clockCaster";

export const FullSizeTurns = () => {
  const { duration, GRID_SIZE } = useSelector(
    (store: RootState) => store.settings
  );
  return (
    <section
      className="flex-col justify-between gap-6 hidden full:flex"
      style={{ height: `${GRID_SIZE * 8}px` }}
    >
      <div className={`h-full flex flex-col justify-between`}>
        <div className="flex flex-col gap-2 items-center">
          <img src="/src/assets/black_user.png" className=" w-24 rounded-md" />
          <h4 className=" text-white font-medium">Black</h4>
        </div>
        <button
          disabled
          className="text-white text-2xl font-semibold tracking-wider bg-blackBtn
            w-full py-1 rounded-md border-b-[5px] border-greenBorder opacity-50"
        >
          {clockCaster(duration)}
        </button>
      </div>
      <div className=" h-full flex flex-col-reverse justify-between">
        <div className="flex flex-col gap-2 items-center">
          <h4 className=" text-white font-medium">White</h4>
          <img src="/src/assets/white_user.png" className=" w-24 rounded-md" />
        </div>
        <button
          disabled
          className="text-blackBtn text-2xl font-semibold tracking-wider bg-white 
            w-full py-1 rounded-md border-t-[5px] border-greenBorder opacity-50"
        >
          {clockCaster(duration)}
        </button>
      </div>
    </section>
  );
};
