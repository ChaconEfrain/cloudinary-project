import { ImageContext } from "@/context/ImageContextProvider";
import { ChangeEvent, useCallback, useContext, useId, useState } from "react";
import Loading from "./Loading";
import ModifiedImage from "./ModifiedImage";
import debounce from "just-debounce-it";

const AdjustImage = ({
  adjustingBrightness,
  adjustingSaturation,
  adjustingHue,
}: {
  adjustingBrightness?: boolean;
  adjustingSaturation?: boolean;
  adjustingHue?: boolean;
}) => {
  const rangeId = useId();
  const [range, setRange] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { adjustBrightness, adjustSaturation, adjustHue, adjustingFinished } =
    useContext(ImageContext);

  const debouncedAdjustBrightness = useCallback(
    debounce((percentage: number) => {
      setLoading(true);
      adjustBrightness!(percentage);
    }, 200),
    [adjustBrightness]
  );

  const debouncedAdjustSaturation = useCallback(
    debounce((percentage: number) => {
      setLoading(true);
      adjustSaturation!(percentage);
    }, 200),
    [adjustBrightness]
  );

  const debouncedAdjustHue = useCallback(
    debounce((percentage: number) => {
      setLoading(true);
      adjustHue!(percentage);
    }, 200),
    [adjustBrightness]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(e.target.value);
    setRange(percentage);
    if (percentage === 0 && adjustingBrightness) debouncedAdjustBrightness(1);
    else if (percentage !== 0 && adjustingBrightness)
      debouncedAdjustBrightness(percentage);
    else if (percentage === 0 && adjustingSaturation)
      debouncedAdjustSaturation!(1);
    else if (percentage !== 0 && adjustingSaturation)
      debouncedAdjustSaturation!(percentage);
    else if (percentage === 0 && adjustingHue) debouncedAdjustHue(1);
    else if (percentage !== 0 && adjustingHue) debouncedAdjustHue(percentage);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ModifiedImage handleLoad={handleLoad} />
      <div className="flex items-center gap-2 text-teal-800 font-semibold text-lg">
        <label htmlFor={rangeId}>Select percentage</label>
        <input
          id={rangeId}
          type="range"
          min={adjustingBrightness ? "-99" : "-100"}
          max="100"
          value={range}
          onChange={handleChange}
        />
        <span>{range}%</span>
        {loading && <Loading width="w-8" height="h-8" />}
      </div>
      <button
        onClick={adjustingFinished!}
        className="bg-teal-800 text-white rounded-full w-full text-center py-2 hover:bg-teal-900 transition-all duration-300"
      >
        Finished
      </button>
    </div>
  );
};

export default AdjustImage;
