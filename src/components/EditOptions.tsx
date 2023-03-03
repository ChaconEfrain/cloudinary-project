import { ImageContext } from "@/context/ImageContextProvider";
import { EditOptionsList } from "@/types";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import AdjustBrightness from "./AdjustBrightness";
import ImageCropper from "./Cropper";
import UploadedImage from "./UploadedImage";

const EditOptions = () => {
  const { state, cropFaces, blurFaces, removeBackground, adjustBrightness } =
    useContext(ImageContext);
  const [showCropper, setShowCropper] = useState({
    toCrop: false,
    toPixelate: false,
  });
  const [showAdjustBrightness, setShowAdjustBrightness] =
    useState<boolean>(false);
  const editOptions = Object.values(EditOptionsList);
  const handlePickOption = (e: BaseSyntheticEvent) => {
    switch (e.target.innerHTML) {
      case EditOptionsList.CROP_FACES:
        cropFaces!();
        break;

      case EditOptionsList.BLUR_FACES:
        blurFaces!();
        break;

      case EditOptionsList.CROP:
        setShowCropper({
          toCrop: true,
          toPixelate: false,
        });
        break;

      case EditOptionsList.REMOVE_BACKGROUND:
        removeBackground!();
        break;

      case EditOptionsList.ADJUST_BRIGHTNESS:
        setShowAdjustBrightness(true);
        adjustBrightness!(1);
        break;

      case EditOptionsList.PIXELATE_AREA:
        setShowCropper({
          toCrop: false,
          toPixelate: true,
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(state?.editedImageUrl);
  }, [state?.editedImageUrl]);

  return (
    <article className="grid grid-cols-[45fr_55fr] justify-center gap-8 mb-8">
      {showAdjustBrightness && <AdjustBrightness />}
      {!showCropper.toCrop &&
        !showCropper.toPixelate &&
        !showAdjustBrightness && <UploadedImage />}
      {showCropper.toCrop && <ImageCropper toCrop={true} />}
      {showCropper.toPixelate && <ImageCropper toPixelate={true} />}
      <div className="flex flex-col gap-4">
        <p className="text-teal-800 font-semibold text-xl text-center">
          What would you like to do?
        </p>
        <ul
          onClick={handlePickOption}
          className="text-teal-500 font-semibold text-lg flex flex-col items-start"
        >
          {editOptions.map((option) => (
            <li
              key={option}
              className="cursor-pointer border-b-2 border-transparent hover:text-teal-800 hover:border-teal-800 transition-all duration-300"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default EditOptions;
