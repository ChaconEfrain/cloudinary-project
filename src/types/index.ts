export enum ImageState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  DONE = "DONE",
}

export type State = {
  imageUploaded: ImageState;
  wantedEffect: string;
  originalImageUrl: string;
};

export type Action = {
  type: string;
  payload?: any;
};

export type ImageContextT = {
  state: State | null;
  setImageState: ((imageState: ImageState) => void) | null;
  setOriginalUrl: ((url: string) => void) | null;
};
