import { ImageContext } from "@/context/ImageContextProvider";
import { MutableRefObject, useContext } from "react";

const UploadedImage = ({
  originalImage,
}: {
  originalImage?: MutableRefObject<null>;
}) => {
  const { state } = useContext(ImageContext);
  return (
    <figure>
      <img
        ref={originalImage}
        src={state?.originalImageUrl}
        alt="Image uploaded by the user"
        className={`aspect-[${state?.originalWidth}/${state?.originalHeight}]`}
      />
    </figure>
  );
};

export default UploadedImage;
