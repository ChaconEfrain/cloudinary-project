import { Action, ImageState, State } from "@/types";

export const reducerActions = {
  SET_ORIGINAL_URL: "SET_ORIGINAL_URL",
  SET_IMAGE_STATE: "SET_IMAGE_STATE",
};

export const initialState = {
  imageUploaded: ImageState.IDLE,
  wantedEffect: "",
  originalImageUrl: "",
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerActions.SET_IMAGE_STATE:
      return {
        ...state,
        imageUploaded: action.payload,
      };

    case reducerActions.SET_ORIGINAL_URL:
      return {
        ...state,
        imageUploaded: ImageState.DONE,
        originalImageUrl: action.payload,
      };

    default:
      return state;
  }
};
