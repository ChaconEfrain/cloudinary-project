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
}

export type State = {
  imageUploaded: ImageState;
  wantedEffect: string;
  originalImageUrl: string;
  originalWidth: number;
  originalHeight: number;
  imagePublicId: string;
  editedImageUrl: string;
  brightnessFinished: boolean;
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
  cropFaces: (() => void) | null;
  blurFaces: (() => void) | null;
  cropImage: ((cropData: CropData) => void) | null;
  removeBackground: (() => void) | null;
  adjustBrightness: ((percentage: number) => void) | null;
  brightnessFinished: (() => void) | null;
  pixelateArea: ((cropData: CropData) => void) | null;
  // turnOld: (() => void) | null;
};

export type CropData = {
  x: number;
  y: number;
  width: number;
  height: number;
  scaleFactor: number;
};
