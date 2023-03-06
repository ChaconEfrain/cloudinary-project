import { ImageContext } from "@/context/ImageContextProvider";
import React, { useContext } from "react";

const ReferenceImage = () => {
  const { state } = useContext(ImageContext);
  return (
    <figure>
      <img
        src={state?.referenceImageUrl}
        alt="Reeference image"
        // onLoad={handleLoad}
        // className={`aspect-[${width}/${height}]`}
      />
    </figure>
  );
};

export default ReferenceImage;
