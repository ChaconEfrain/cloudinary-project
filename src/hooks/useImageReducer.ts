import { initialState, reducer, reducerActions } from "@/reducer";
import { ImageState } from "@/types";
import { useReducer } from "react";

const useImageReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setImageState = (imageState: ImageState) => {
    dispatch({ type: reducerActions.SET_IMAGE_STATE, payload: imageState });
  };

  const setOriginalUrl = (url: string) => {
    dispatch({ type: reducerActions.SET_ORIGINAL_URL, payload: url });
  };

  return { state, setImageState, setOriginalUrl };
};

export default useImageReducer;
