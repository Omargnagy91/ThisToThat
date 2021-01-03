import { writable } from "svelte/store";
import { createFFmpeg, FFmpeg } from "@ffmpeg/ffmpeg";

// AppState indicates the current state of the conversion process.
export enum AppUserState {
  // The Input stage is where the user imports file(s) that will be converted.
  Input,
  // The Configuration stage is where the specifies how the files will be converted.
  Configuration,
  // The Output stage is where the user will be able to see the output of the conversion
  // and download the converted files.
  Output,
}

// Define the initial application state.
// Using a interface here for typing.
export interface ApplicationState {
  ffmpeg?: FFmpeg; // the ffmpeg module.
  ffmpegReady: boolean; // Flag indicating weather ffmpeg has loaded yet
  appState: AppUserState; // app state
  UploadedFiles: File[]; // User uploaded files
}

const initalState : ApplicationState = {
  ffmpeg: undefined,
  ffmpegReady: false,
  appState: AppUserState.Input,
  UploadedFiles: []
};

// Creating custom store. Start at the Input state.
const { subscribe, update, set } = writable(initalState);

// incrementState and decrementState change the application user state.
var incrementState = () => {
  update((state: ApplicationState) => {
    switch(state.appState) {
      case AppUserState.Input:
        return {...state, appState: AppUserState.Configuration};
      case AppUserState.Configuration:
        return {...state, appState: AppUserState.Output};
      case AppUserState.Output:
        return {...state, appState: AppUserState.Output};
      default:
        return state;
    }
  });
};

var decrementState = () => {
  update((state: ApplicationState) => {
    switch(state.appState) {
      case AppUserState.Input:
        return {...state, appState: AppUserState.Input};
      case AppUserState.Configuration:
        return {...state, appState: AppUserState.Input};
      case AppUserState.Output:
        return {...state, appState: AppUserState.Configuration};
      default:
        return state;
    }
  });
};

var resetApplicationState = () => {
  set(initalState);
};

var addUploadedFiles = (files: File[]) => {
  update((state: ApplicationState) => {
    const filteredFiles = files.filter((file: File) => {
      // TODO: add support for other video types.
      return file.type == "video/mp4";
    });
    return {...state, UploadedFiles: state.UploadedFiles.concat(filteredFiles)};
  });
};

export const AppStateStore = {
  subscribe,
  incrementState,
  decrementState,
  resetApplicationState,
  addUploadedFiles
};

// load ffmpeg and update the application state.
const ffmpeg = createFFmpeg({log: true});
ffmpeg.load()
  .then(() => {
    update((state: ApplicationState) => {
      return {...state, ffmpeg: ffmpeg, ffmpegReady: true};
    });
  });