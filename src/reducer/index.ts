import cloudinary from "@/cloudinary/config";
import { Action, ImageState, State } from "@/types";
import {
  brightness,
  hue,
  improve,
  saturation,
} from "@cloudinary/url-gen/actions/adjust";
import {
  backgroundRemoval,
  pixelate,
  styleTransfer,
} from "@cloudinary/url-gen/actions/effect";
import { crop, fill, thumbnail } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { custom, faces } from "@cloudinary/url-gen/qualifiers/region";
import { image } from "@cloudinary/url-gen/qualifiers/source";

export const reducerActions = {
  RESET: "RESET",
  EDIT_AGAIN: "EDIT_AGAIN",
  SET_ORIGINAL_URL: "SET_ORIGINAL_URL",
  SET_REFERENCE_IMAGE_URL: "SET_REFERENCE_IMAGE_URL",
  SET_IMAGE_STATE: "SET_IMAGE_STATE",
  CROP_FACES: "CROP_FACES",
  BLUR_FACES: "BLUR_FACES",
  CROP: "CROP",
  REMOVE_BACKGROUND: "REMOVE_BACKGROUND",
  ADJUST_BRIGHTNESS: "ADJUST_BRIGHTNESS",
  ADJUST_SATURATION: "ADJUST_SATURATION",
  ADJUSTING_FINISHED: "ADJUSTING_FINISHED",
  PIXELATE_AREA: "PIXELATE_AREA",
  ROUND_IMAGE: "ROUND_IMAGE",
  ADJUST_HUE: "ADJUST_HUE",
  IMPROVE_QUALITY: "IMPROVE_QUALITY",
  SHOW_UPLOAD_REFERENCE_IMAGE: "SHOW_UPLOAD_REFERENCE_IMAGE",
  TURN_INTO_ARTWORK: "TURN_INTO_ARTWORK",
  // TURN_OLD: "TURN_OLD",
};

export const initialState = {
  imageUploaded: ImageState.IDLE,
  wantedEffect: "",
  originalImageUrl: "",
  referenceImageUrl: "",
  originalWidth: 0,
  originalHeight: 0,
  imagePublicId: "",
  referenceImagePublicId: "",
  editedImageUrl: "",
  adjustingFinished: false,
  showUploadReferenceImage: false,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerActions.RESET:
      return initialState;

    case reducerActions.EDIT_AGAIN:
      return {
        ...state,
        editedImageUrl: "",
        referenceImageUrl: "",
        adjustingFinished: false,
        showUploadReferenceImage: false,
      };

    case reducerActions.SET_IMAGE_STATE:
      return {
        ...state,
        imageUploaded: action.payload,
      };

    case reducerActions.SET_ORIGINAL_URL: {
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
      };
    }

    case reducerActions.SET_REFERENCE_IMAGE_URL: {
      const {
        publicId,
        url,
        // width: originalWidth,
        // height: originalHeight,
      } = action.payload;
      return {
        ...state,
        referenceImageUrl: url,
        referenceImagePublicId: publicId,
        // originalWidth: originalWidth,
        // originalHeight: originalHeight,
      };
    }

    case reducerActions.SHOW_UPLOAD_REFERENCE_IMAGE: {
      return {
        ...state,
        showUploadReferenceImage: true,
      };
    }

    case reducerActions.CROP_FACES: {
      const facesImage = cloudinary
        .image(state.imagePublicId)
        .resize(thumbnail().width(500).height(500).gravity("faces"));

      return {
        ...state,
        editedImageUrl: facesImage.toURL(),
        adjustingFinished: true,
      };
    }

    case reducerActions.BLUR_FACES: {
      const blurFaces = cloudinary
        .image(state.imagePublicId)
        .effect(pixelate().squareSize(30).region(faces()));
      return {
        ...state,
        editedImageUrl: blurFaces.toURL(),
        adjustingFinished: true,
      };
    }

    case reducerActions.CROP: {
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
        adjustingFinished: true,
      };
    }

    case reducerActions.REMOVE_BACKGROUND: {
      const imageWithoutBackground = cloudinary
        .image(state.imagePublicId)
        .effect(backgroundRemoval());
      return {
        ...state,
        editedImageUrl: imageWithoutBackground.toURL(),
        adjustingFinished: true,
      };
    }

    case reducerActions.ADJUST_BRIGHTNESS: {
      const percentage = action.payload;
      const image = cloudinary
        .image(state.imagePublicId)
        .adjust(brightness().level(percentage));
      return {
        ...state,
        editedImageUrl: image.toURL(),
      };
    }

    case reducerActions.ADJUSTING_FINISHED:
      return {
        ...state,
        adjustingFinished: true,
      };

    case reducerActions.PIXELATE_AREA: {
      const { width, height, x, y, scaleFactor } = action.payload;
      const pixelatedImage = cloudinary
        .image(state.imagePublicId)
        .effect(
          pixelate().region(
            custom()
              .width(Math.round(width * scaleFactor))
              .height(Math.round(height * scaleFactor))
              .x(Math.round(x * scaleFactor))
              .y(Math.round(y * scaleFactor))
          )
        )
        .resize(fill());
      return {
        ...state,
        editedImageUrl: pixelatedImage.toURL(),
        adjustingFinished: true,
      };
    }

    case reducerActions.ROUND_IMAGE: {
      const roundedImage = cloudinary
        .image(state.imagePublicId)
        .resize(fill().width(300).height(300).gravity("faces"))
        .roundCorners(max());
      return {
        ...state,
        editedImageUrl: roundedImage.toURL(),
        adjustingFinished: true,
      };
    }

    case reducerActions.ADJUST_HUE: {
      const percentage = action.payload;
      const newHueImage = cloudinary
        .image(state.imagePublicId)
        .adjust(hue().level(percentage));
      return {
        ...state,
        editedImageUrl: newHueImage.toURL(),
      };
    }

    case reducerActions.IMPROVE_QUALITY: {
      const improvedImage = cloudinary
        .image(state.imagePublicId)
        .adjust(improve());
      return {
        ...state,
        editedImageUrl: improvedImage.toURL(),
        adjustingFinished: true,
      };
    }

    case reducerActions.ADJUST_SATURATION: {
      const percentage = action.payload;
      const adjustedImage = cloudinary
        .image(state.imagePublicId)
        .adjust(saturation().level(percentage));
      return {
        ...state,
        editedImageUrl: adjustedImage.toURL(),
      };
    }
    case reducerActions.TURN_INTO_ARTWORK: {
      const artImage = cloudinary
        .image(state.imagePublicId)
        .resize(fill().width(1000).height(1000))
        .effect(styleTransfer(image(state.referenceImagePublicId)));
      return {
        ...state,
        editedImageUrl: artImage.toURL(),
      };
    }

    default:
      return state;
  }
};
