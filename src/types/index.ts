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
}

export type State = {
  imageUploaded: ImageState;
  wantedEffect: string;
  originalImageUrl: string;
  originalWidth: number;
  imagePublicId: string;
  editedImageUrl: string;
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
    | ((imageInfo: { url: string; publicId: string; width: number }) => void)
    | null;
  cropFaces: (() => void) | null;
  blurFaces: (() => void) | null;
  cropImage: ((cropData: CropData) => void) | null;
  removeBackground: (() => void) | null;
};

export type CropData = {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
};
