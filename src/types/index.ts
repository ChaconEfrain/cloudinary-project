export enum ImageState {
  IDLE = "idle",
  LOADING = "loading",
  DONE = "done",
}

export enum EditOptionsList {
  REMOVE_BACKGROUND = "Remove background",
  CROP = "Crop",
  CROP_FACES = "Crop faces",
  BLUR_FACES = "Blur faces",
  // TURN_OLD = "Turn old",
  ADJUST_BRIGHTNESS = "Adjust brightness",
  PIXELATE_AREA = "Pixelate area",
  ROUND_IMAGE = "Round image",
  ADJUST_HUE = "Adjust hue",
  IMPROVE_QUALITY = "Improve quality",
  ADJUST_SATURATION = "Adjust saturation",
  TURN_INTO_ARTWORK = "Turn into artwork",
}

export type State = {
  imageUploaded: ImageState;
  wantedEffect: string;
  originalImageUrl: string;
  referenceImageUrl: string;
  originalWidth: number;
  originalHeight: number;
  imagePublicId: string;
  referenceImagePublicId: string;
  editedImageUrl: string;
  adjustingFinished: boolean;
  showUploadReferenceImage: boolean;
};

export type Action = {
  type: string;
  payload?: any;
};

export type ImageContextT = {
  state: State | null;
  reset: (() => void) | null;
  editAgain: (() => void) | null;
  setImageState: ((imageState: ImageState) => void) | null;
  setOriginalUrl:
    | ((imageInfo: {
        url: string;
        publicId: string;
        width: number;
        height: number;
      }) => void)
    | null;
  setReferenceImageUrl:
    | ((imageInfo: {
        url: string;
        publicId: string;
        width: number;
        height: number;
      }) => void)
    | null;
  cropFaces: (() => void) | null;
  blurFaces: (() => void) | null;
  cropImage: ((cropData: CropData) => void) | null;
  removeBackground: (() => void) | null;
  adjustBrightness: ((percentage: number) => void) | null;
  adjustSaturation: ((percentage: number) => void) | null;
  adjustingFinished: (() => void) | null;
  pixelateArea: ((cropData: CropData) => void) | null;
  roundImage: (() => void) | null;
  adjustHue: ((percentage: number) => void) | null;
  improveQuality: (() => void) | null;
  showUploadReferenceImage: (() => void) | null;
  turnIntoArtwork: (() => void) | null;
  // turnOld: (() => void) | null;
};

export type CropData = {
  x: number;
  y: number;
  width: number;
  height: number;
  scaleFactor: number;
};
