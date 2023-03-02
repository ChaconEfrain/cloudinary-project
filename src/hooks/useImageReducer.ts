import { initialState, reducer, reducerActions } from "@/reducer";
import { CropData, ImageState } from "@/types";
import { useReducer } from "react";

const useImageReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reset = () => {
    dispatch({ type: reducerActions.RESET });
  };

  const setImageState = (imageState: ImageState) => {
    dispatch({ type: reducerActions.SET_IMAGE_STATE, payload: imageState });
  };

  const editAgain = () => {
    dispatch({ type: reducerActions.EDIT_AGAIN });
  };

  const setOriginalUrl = (imageInfo: {
    url: string;
    publicId: string;
    width: number;
  }) => {
    dispatch({ type: reducerActions.SET_ORIGINAL_URL, payload: imageInfo });
  };

  const cropFaces = () => {
    dispatch({ type: reducerActions.CROP_FACES });
  };

  const blurFaces = () => {
    dispatch({ type: reducerActions.BLUR_FACES });
  };

  const cropImage = (cropData: CropData) => {
    dispatch({ type: reducerActions.CROP, payload: cropData });
  };

  const removeBackground = () => {
    dispatch({ type: reducerActions.REMOVE_BACKGROUND });
  };

  return {
    state,
    reset,
    editAgain,
    setImageState,
    setOriginalUrl,
    cropFaces,
    blurFaces,
    cropImage,
    removeBackground,
  };
};

export default useImageReducer;
