import useImageReducer from "@/hooks/useImageReducer";
import { ImageContextT } from "@/types";
import { createContext, ReactNode } from "react";

export const ImageContext = createContext<ImageContextT>({
  state: null,
  setImageState: null,
  setOriginalUrl: null,
});

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {
  const { state, setImageState, setOriginalUrl } = useImageReducer();
  return (
    <ImageContext.Provider value={{ state, setImageState, setOriginalUrl }}>
      {children}
    </ImageContext.Provider>
  );
};
