import { useContext, useEffect, useRef, useState } from "react";
import { ImageContext } from "@/context/ImageContextProvider";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import ImageUploaded from "./UploadedImage";

const ImageCropper = ({
  toCrop,
  toPixelate,
}: {
  toCrop?: boolean;
  toPixelate?: boolean;
}) => {
  const { state, cropImage, pixelateArea } = useContext(ImageContext);
  const [cropper, setCropper] = useState<Cropper>();
  const cropperInitialized = useRef(false);
  const originalImage = useRef(null);
  const divRef = useRef(null);
  useEffect(() => {
    if (!cropperInitialized.current) {
      const cropper = new Cropper(originalImage.current!, {
        aspectRatio: 0,
        viewMode: 0,
      });
      cropperInitialized.current = true;
      setCropper(cropper);
    }
    console.log(state?.editedImageUrl);
  }, [cropper, state?.editedImageUrl]);

  const handleCropping = () => {
    const cropInfo = cropper?.getCropBoxData();
    const { left, top, width, height } = cropInfo!;
    const div = divRef.current as unknown as HTMLDivElement;
    const imageWidth = div.getBoundingClientRect().width;
    const scaleFactor = state?.originalWidth! / imageWidth;
    const cropData = { x: left, y: top, width, height, scaleFactor };

    if (toCrop) {
      cropImage!(cropData);
    } else if (toPixelate) pixelateArea!(cropData);
  };

  return (
    <div ref={divRef}>
      <ImageUploaded originalImage={originalImage} />
      {/* <img
        ref={originalImage}
        src={state?.originalImageUrl}
        className="max-w-full"
      /> */}
      <button
        onClick={handleCropping}
        className="col-span-full bg-teal-800 text-white rounded-full w-full text-center py-2 hover:bg-teal-900 transition-all duration-300 mt-4"
      >
        Accept
      </button>
    </div>
  );
};

export default ImageCropper;
