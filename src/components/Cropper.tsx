import { useContext, useEffect, useRef, useState } from "react";
import { ImageContext } from "@/context/ImageContextProvider";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import ImageUploaded from "./UploadedImage";

const ImageCropper = () => {
  const { state, cropImage } = useContext(ImageContext);
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
    const cropData = cropper?.getCropBoxData();
    const { left, top, width, height } = cropData!;
    const div = divRef.current as unknown as HTMLDivElement;
    const imageWidth = div.getBoundingClientRect().width;
    const scaleFactor = state?.originalWidth! / imageWidth;

    cropImage!({ x: left, y: top, width, height, scaleFactor });
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
        Crop image
      </button>
    </div>
  );
};

export default ImageCropper;
