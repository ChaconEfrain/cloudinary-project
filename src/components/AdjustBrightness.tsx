import { ImageContext } from "@/context/ImageContextProvider";
import { ChangeEvent, useContext, useId, useState } from "react";
import Loading from "./Loading";
import ModifiedImage from "./ModifiedImage";

const AdjustBrightness = () => {
  const rangeId = useId();
  const [range, setRange] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { adjustBrightness, brightnessFinished } = useContext(ImageContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(e.target.value);
    setRange(percentage);
    if (percentage === 0) adjustBrightness!(1);
    else adjustBrightness!(percentage);
  };

  const finishedBrightness = () => brightnessFinished!();

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`${
          loading ? "block" : "hidden"
        } justify-self-center self-center`}
      >
        <Loading loading={loading} />
      </div>
      <ModifiedImage handleLoad={handleLoad} />
      <div className="flex gap-2 text-teal-800 font-semibold text-lg">
        <label htmlFor={rangeId}>Select brightness</label>
        <input
          id={rangeId}
          type="range"
          min="0"
          max="100"
          value={range}
          onChange={handleChange}
        />
        <span>{range}%</span>
      </div>
      <button
        onClick={finishedBrightness}
        className="bg-teal-800 text-white rounded-full w-full text-center py-2 hover:bg-teal-900 transition-all duration-300"
      >
        Finished
      </button>
    </div>
  );
};

export default AdjustBrightness;
