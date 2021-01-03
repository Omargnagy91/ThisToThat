import { writable } from "svelte/store";
import { createFFmpeg, FFmpeg } from "@ffmpeg/ffmpeg";

// AppState indicates the current state of the conversion process.
export enum AppState {
  // The Input stage is where the user imports file(s) that will be converted.
  Input,
  // The Configuration stage is where the specifies how the files will be converted.
  Configuration,
  // The Output stage is where the user will be able to see the output of the conversion
  // and download the converted files.
  OutputState,
}

// Define the initial application state.
// Using a interface here for typing.
export interface ApplicationState {
  ffmpeg?: FFmpeg; // the ffmpeg module.
  ffmpegReady: boolean; // Flag indicating weather ffmpeg has loaded yet
  appState: AppState; // app state
}

const initalState : ApplicationState = {
  ffmpeg: undefined,
  ffmpegReady: false,
  appState: AppState.Input
};

// Creating custom store. Start at the Input state.
const { subscribe, update, set } = writable(initalState);

// incrementState and decrementState  
var incrementState = () => {
  update((state: ApplicationState) => {
    switch(state.appState) {
      case AppState.Input:
        return {...state, appState: AppState.Configuration};
      case AppState.Configuration:
        return {...state, appState: AppState.Output};
      case AppState.Output:
        return {...state, appState: AppState.Output};
      default:
        return state;
    }
  });
};

var decrementState = () => {
  update((state: ApplicationState) => {
    switch(state.appState) {
      case AppState.Input:
        return {...state, appState: AppState.Input};
      case AppState.Configuration:
        return {...state, appState: AppState.Input};
      case AppState.Output:
        return {...state, appState: AppState.Configuration};
      default:
        return state;
    }
  });
};

var resetApplicationState = () => {
  set(initalState);
};

export const AppStateStore = {
  subscribe,
  incrementState,
  decrementState,
  resetApplicationState
};

// load ffmpeg and update the application state.
const ffmpeg = createFFmpeg({log: true});
ffmpeg.load()
  .then(() => {
    update((state: ApplicationState) => {
      return {...state, ffmpeg: ffmpeg, ffmpegReady: true};
    });
  });