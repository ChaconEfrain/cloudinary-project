import useImageReducer from "@/hooks/useImageReducer";
import { ImageContextT } from "@/types";
import { createContext, ReactNode } from "react";

export const ImageContext = createContext<ImageContextT>({
  state: null,
  reset: null,
  editAgain: null,
  setImageState: null,
  setOriginalUrl: null,
  setReferenceImageUrl: null,
  cropFaces: null,
  blurFaces: null,
  cropImage: null,
  removeBackground: null,
  adjustBrightness: null,
  adjustingFinished: null,
  pixelateArea: null,
  roundImage: null,
  adjustHue: null,
  improveQuality: null,
  adjustSaturation: null,
  showUploadReferenceImage: null,
  turnIntoArtwork: null,
});

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    state,
    reset,
    editAgain,
    setImageState,
    setOriginalUrl,
    setReferenceImageUrl,
    cropFaces,
    blurFaces,
    cropImage,
    removeBackground,
    adjustBrightness,
    adjustingFinished,
    pixelateArea,
    roundImage,
    adjustHue,
    improveQuality,
    adjustSaturation,
    showUploadReferenceImage,
    turnIntoArtwork,
  } = useImageReducer();
  return (
    <ImageContext.Provider
      value={{
        state,
        reset,
        editAgain,
        setImageState,
        setOriginalUrl,
        setReferenceImageUrl,
        cropFaces,
        blurFaces,
        cropImage,
        removeBackground,
        adjustBrightness,
        adjustingFinished,
        pixelateArea,
        roundImage,
        adjustHue,
        improveQuality,
        adjustSaturation,
        showUploadReferenceImage,
        turnIntoArtwork,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
