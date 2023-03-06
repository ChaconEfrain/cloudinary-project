import { ImageContext } from "@/context/ImageContextProvider";
import { EditOptionsList } from "@/types";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import AdjustImage from "./AdjustImage";
import ImageCropper from "./Cropper";
import UploadedImage from "./UploadedImage";

const EditOptions = () => {
  const {
    cropFaces,
    blurFaces,
    removeBackground,
    adjustBrightness,
    roundImage,
    adjustHue,
    improveQuality,
    adjustSaturation,
    showUploadReferenceImage,
  } = useContext(ImageContext);
  const [showCropper, setShowCropper] = useState({
    toCrop: false,
    toPixelate: false,
  });
  const [showAdjustImage, setShowAdjustImage] = useState({
    adjustingBrightness: false,
    adjustingSaturation: false,
    adjustingHue: false,
  });
  const [activeOption, setActiveOption] = useState("");
  const editOptions = Object.values(EditOptionsList);
  const handlePickOption = (e: BaseSyntheticEvent) => {
    switch (e.target.innerHTML) {
      case EditOptionsList.CROP_FACES:
        cropFaces!();
        setShowCropper({
          toCrop: true,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        break;

      case EditOptionsList.BLUR_FACES:
        blurFaces!();
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        break;

      case EditOptionsList.CROP:
        setShowCropper({
          toCrop: true,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        setActiveOption(EditOptionsList.CROP);
        break;

      case EditOptionsList.REMOVE_BACKGROUND:
        removeBackground!();
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        break;

      case EditOptionsList.ADJUST_BRIGHTNESS:
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: true,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        setActiveOption(EditOptionsList.ADJUST_BRIGHTNESS);
        adjustBrightness!(1);
        break;

      case EditOptionsList.ADJUST_SATURATION:
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: true,
          adjustingHue: false,
        });
        setActiveOption(EditOptionsList.ADJUST_SATURATION);
        adjustSaturation!(1);
        break;

      case EditOptionsList.PIXELATE_AREA:
        setShowCropper({
          toCrop: false,
          toPixelate: true,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        setActiveOption(EditOptionsList.PIXELATE_AREA);
        break;

      case EditOptionsList.ROUND_IMAGE:
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        roundImage!();
        break;

      case EditOptionsList.ADJUST_HUE:
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: true,
        });
        setActiveOption(EditOptionsList.ADJUST_HUE);
        adjustHue!(1);
        break;

      case EditOptionsList.IMPROVE_QUALITY:
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        improveQuality!();
        break;

      case EditOptionsList.TURN_INTO_ARTWORK:
        setShowCropper({
          toCrop: false,
          toPixelate: false,
        });
        setShowAdjustImage({
          adjustingBrightness: false,
          adjustingSaturation: false,
          adjustingHue: false,
        });
        showUploadReferenceImage!();
        break;

      default:
        break;
    }
  };

  const showUploadedImage =
    !showCropper.toCrop &&
    !showCropper.toPixelate &&
    !showAdjustImage.adjustingSaturation &&
    !showAdjustImage.adjustingBrightness &&
    !showAdjustImage.adjustingHue;

  return (
    <article className="grid grid-cols-[45fr_55fr] justify-center gap-8 mb-8">
      {showAdjustImage.adjustingBrightness && (
        <AdjustImage adjustingBrightness />
      )}
      {showAdjustImage.adjustingSaturation && (
        <AdjustImage adjustingSaturation />
      )}

      {showAdjustImage.adjustingHue && <AdjustImage adjustingHue />}
      {showUploadedImage && <UploadedImage />}
      {showCropper.toCrop && <ImageCropper toCrop />}
      {showCropper.toPixelate && <ImageCropper toPixelate />}
      <div className="flex flex-col gap-4">
        <p className="text-teal-800 font-semibold text-2xl">
          What would you like to do?
        </p>
        <ul
          onClick={handlePickOption}
          className="text-teal-500 font-semibold text-xl flex flex-wrap gap-4"
        >
          {editOptions.map((option) => (
            <li
              key={option}
              className={`cursor-pointer border-b-2 hover:text-teal-800 hover:border-teal-800 transition-all duration-300 ${
                activeOption === option
                  ? "text-teal-800 border-teal-800"
                  : "border-transparent"
              }`}
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
