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
    height: number;
  }) => {
    dispatch({ type: reducerActions.SET_ORIGINAL_URL, payload: imageInfo });
  };

  const setReferenceImageUrl = (imageInfo: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }) => {
    dispatch({
      type: reducerActions.SET_REFERENCE_IMAGE_URL,
      payload: imageInfo,
    });
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

  const adjustBrightness = (percentage: number) => {
    dispatch({ type: reducerActions.ADJUST_BRIGHTNESS, payload: percentage });
  };

  const adjustingFinished = () => {
    dispatch({ type: reducerActions.ADJUSTING_FINISHED });
  };

  const pixelateArea = (cropData: CropData) => {
    dispatch({ type: reducerActions.PIXELATE_AREA, payload: cropData });
  };

  const roundImage = () => {
    dispatch({ type: reducerActions.ROUND_IMAGE });
  };

  const adjustHue = (percentage: number) => {
    dispatch({ type: reducerActions.ADJUST_HUE, payload: percentage });
  };

  const improveQuality = () => {
    dispatch({ type: reducerActions.IMPROVE_QUALITY });
  };

  const adjustSaturation = (percentage: number) => {
    dispatch({ type: reducerActions.ADJUST_SATURATION, payload: percentage });
  };

  const showUploadReferenceImage = () => {
    dispatch({ type: reducerActions.SHOW_UPLOAD_REFERENCE_IMAGE });
  };

  const turnIntoArtwork = () => {
    dispatch({ type: reducerActions.TURN_INTO_ARTWORK });
  };

  return {
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
  };
};

export default useImageReducer;
