import cloudinary from "@/cloudinary/config";
import { Action, ImageState, State } from "@/types";
import { brightness } from "@cloudinary/url-gen/actions/adjust";
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
  ADJUST_BRIGHTNESS: "ADJUST_BRIGHTNESS",
  BRIGHTNESS_FINISHED: "BRIGHTNESS_FINISHED",
  // TURN_OLD: "TURN_OLD",
};

export const initialState = {
  imageUploaded: ImageState.IDLE,
  wantedEffect: "",
  originalImageUrl: "",
  originalWidth: 0,
  originalHeight: 0,
  imagePublicId: "",
  editedImageUrl: "",
  brightnessFinished: false,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerActions.RESET:
      return initialState;

    case reducerActions.EDIT_AGAIN:
      return {
        ...state,
        editedImageUrl: "",
        brightnessFinished: false,
      };

    case reducerActions.SET_IMAGE_STATE:
      return {
        ...state,
        imageUploaded: action.payload,
      };

    case reducerActions.SET_ORIGINAL_URL:
      const {
        publicId,
        url,
        width: originalWidth,
        height: originalHeight,
      } = action.payload;
      return {
        ...state,
        imageUploaded: ImageState.DONE,
        originalImageUrl: url,
        imagePublicId: publicId,
        originalWidth: originalWidth,
        originalHeight: originalHeight,
        brightnessFinished: true,
      };

    case reducerActions.CROP_FACES:
      const facesImage = cloudinary
        .image(state.imagePublicId)
        .resize(thumbnail().width(500).height(500).gravity("faces"));

      return {
        ...state,
        editedImageUrl: facesImage.toURL(),
        brightnessFinished: true,
      };

    case reducerActions.BLUR_FACES:
      const blurFaces = cloudinary
        .image(state.imagePublicId)
        .effect(pixelate().squareSize(30).region(faces()));
      return {
        ...state,
        editedImageUrl: blurFaces.toURL(),
        brightnessFinished: true,
      };

    case reducerActions.CROP:
      const { width, height, x, y, scaleFactor } = action.payload;
      const croppedImage = cloudinary.image(state.imagePublicId).resize(
        crop()
          .width(Math.round(width * scaleFactor))
          .height(Math.round(height * scaleFactor))
          .x(Math.round(x * scaleFactor))
          .y(Math.round(y * scaleFactor))
      );
      return {
        ...state,
        editedImageUrl: croppedImage.toURL(),
        brightnessFinished: true,
      };

    case reducerActions.REMOVE_BACKGROUND:
      const imageWithoutBackground = cloudinary
        .image(state.imagePublicId)
        .effect(backgroundRemoval());
      return {
        ...state,
        editedImageUrl: imageWithoutBackground.toURL(),
        brightnessFinished: true,
      };

    case reducerActions.ADJUST_BRIGHTNESS:
      const percentage = action.payload;
      const image = cloudinary
        .image(state.imagePublicId)
        .adjust(brightness().level(percentage));
      return {
        ...state,
        editedImageUrl: image.toURL(),
      };

    case reducerActions.BRIGHTNESS_FINISHED:
      return {
        ...state,
        brightnessFinished: true,
      };

    default:
      return state;
  }
};
