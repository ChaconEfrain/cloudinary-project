import useImageReducer from "@/hooks/useImageReducer";
import { ImageContextT } from "@/types";
import { createContext, ReactNode } from "react";

export const ImageContext = createContext<ImageContextT>({
  state: null,
  reset: null,
  editAgain: null,
  setImageState: null,
  setOriginalUrl: null,
  cropFaces: null,
  blurFaces: null,
  cropImage: null,
  removeBackground: null,
  adjustBrightness: null,
  brightnessFinished: null,
  pixelateArea: null,
});

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    state,
    reset,
    editAgain,
    setImageState,
    setOriginalUrl,
    cropFaces,
    blurFaces,
    cropImage,
    removeBackground,
    adjustBrightness,
    brightnessFinished,
    pixelateArea,
  } = useImageReducer();
  return (
    <ImageContext.Provider
      value={{
        state,
        reset,
        editAgain,
        setImageState,
        setOriginalUrl,
        cropFaces,
        blurFaces,
        cropImage,
        removeBackground,
        adjustBrightness,
        brightnessFinished,
        pixelateArea,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
