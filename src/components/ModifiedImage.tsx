import { ImageContext } from "@/context/ImageContextProvider";
import { useContext, useEffect, useRef, useState } from "react";

const ModifiedImage = ({ handleLoad }: { handleLoad?: () => void }) => {
  const { state } = useContext(ImageContext);
  const [processingImage, setProcessingImage] = useState<boolean>(true);
  const [tries, setTries] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const intervalId = useRef<any>(null);
  const imageRef = useRef(null);
  if (state?.editedImageUrl.includes("e_background_removal")) {
    if (processingImage) {
      clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
        setTries((prev) => ++prev);
        const img = new Image();
        img.src = state.editedImageUrl;
        img.onload = () => {
          setProcessingImage(false);
          clearInterval(intervalId.current);
        };
      }, 500);
    }
  }

  useEffect(() => {
    if (imageRef.current) {
      const imageEl = imageRef.current as unknown as HTMLImageElement;
      const imageWidth = Math.round(imageEl.getBoundingClientRect().width);
      const imageHeight = Math.round(imageEl.getBoundingClientRect().height);
      setWidth(imageWidth);
      setHeight(imageHeight);
    }
  }, []);

  return (
    <figure>
      <img
        ref={imageRef}
        src={`${state?.editedImageUrl}&tries=${tries}`}
        alt="Modified image"
        onLoad={handleLoad}
        className={`aspect-[${width}/${height}]`}
      />
    </figure>
  );
};

export default ModifiedImage;
