import cloudinary from "@/cloudinary/config";
import { Action, ImageState, State } from "@/types";
import {
  backgroundRemoval,
  pixelate,
} from "@cloudinary/url-gen/actions/effect";
import { crop, thumbnail } from "@cloudinary/url-gen/actions/resize";
import { faces } from "@cloudinary/url-gen/qualifiers/region";

export const reducerActions = {
  RESET: "RESET",
  EDIT_AGAIN: "EDIT_AGAIN",
  SET_ORIGINAL_URL: "SET_ORIGINAL_URL",
  SET_IMAGE_STATE: "SET_IMAGE_STATE",
  CROP_FACES: "CROP_FACES",
  BLUR_FACES: "BLUR_FACES",
  CROP: "CROP",
  REMOVE_BACKGROUND: "REMOVE_BACKGROUND",
};

export const initialState = {
  imageUploaded: ImageState.IDLE,
  wantedEffect: "",
  originalImageUrl: "",
  originalWidth: 0,
  imagePublicId: "",
  editedImageUrl: "",
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerActions.RESET:
      return {
        imageUploaded: ImageState.IDLE,
        wantedEffect: "",
        originalImageUrl: "",
        originalWidth: 0,
        imagePublicId: "",
        editedImageUrl: "",
      };

    case reducerActions.EDIT_AGAIN:
      return {
        ...state,
        editedImageUrl: "",
      };

    case reducerActions.SET_IMAGE_STATE:
      return {
        ...state,
        imageUploaded: action.payload,
      };

    case reducerActions.SET_ORIGINAL_URL:
      const { publicId, url, width: originalWidth } = action.payload;
      return {
        ...state,
        imageUploaded: ImageState.DONE,
        originalImageUrl: url,
        imagePublicId: publicId,
        originalWidth: originalWidth,
      };

    case reducerActions.CROP_FACES:
      const facesImage = cloudinary
        .image(state.imagePublicId)
        .resize(thumbnail().width(500).height(500).gravity("faces"));
      return {
        ...state,
        editedImageUrl: facesImage.toURL(),
      };

    case reducerActions.BLUR_FACES:
      const blurFaces = cloudinary
        .image(state.imagePublicId)
        .effect(pixelate().squareSize(30).region(faces()));
      return {
        ...state,
        editedImageUrl: blurFaces.toURL(),
      };

    case reducerActions.CROP:
      const { width, height, x, y, scale } = action.payload;
      const croppedImage = cloudinary.image(state.imagePublicId).resize(
        crop()
          .width(Math.round(width * scale))
          .height(Math.round(height * scale))
          .x(Math.round(x * scale))
          .y(Math.round(y * scale))
      );
      return {
        ...state,
        editedImageUrl: croppedImage.toURL(),
      };

    case reducerActions.REMOVE_BACKGROUND:
      const imageWithoutBackground = cloudinary
        .image(state.imagePublicId)
        .effect(backgroundRemoval());
      return {
        ...state,
        editedImageUrl: imageWithoutBackground.toURL(),
      };

    default:
      return state;
  }
};
