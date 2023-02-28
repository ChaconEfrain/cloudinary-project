import { ImageContext } from "@/context/ImageContextProvider";
import { useContext } from "react";

const ImageUploaded = () => {
  const { state } = useContext(ImageContext);
  return (
    <figure>
      <img src={state?.originalImageUrl} alt="Image uploaded by the user" />
    </figure>
  );
};

export default ImageUploaded;
