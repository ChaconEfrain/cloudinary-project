import { ImageContext } from "@/context/ImageContextProvider";
import { useContext, useRef, useState } from "react";

const ModifiedImage = ({ handleLoad }: { handleLoad: () => void }) => {
  const { state } = useContext(ImageContext);
  const [processingImage, setProcessingImage] = useState<boolean>(true);
  const [tries, setTries] = useState<number>(0);
  const intervalId = useRef<any>(null);
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
  return (
    <figure>
      <img
        src={`${state?.editedImageUrl}&tries=${tries}`}
        alt="Modified image"
        onLoad={handleLoad}
      />
    </figure>
  );
};

export default ModifiedImage;
