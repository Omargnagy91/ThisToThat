import { writable, get } from "svelte/store";
import { createFFmpeg, FFmpeg } from "@ffmpeg/ffmpeg";
import { VideoFile } from "../files/file";

// AppState indicates the current state of the conversion process.
export enum AppUserState {
  // The Input stage is where the user imports file(s) that will be converted.
  Input,
  // The Configuration stage is where the specifies how the files will be converted.
  Configuration,
  // State where the files are being converted.
  Process,
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
  uploadedFiles: VideoFile[]; // User uploaded files
  outputFiles: VideoFile[]; // Output files
  outputFormat: string; // Output file format
}

const initalState : ApplicationState = {
  ffmpeg: undefined,
  ffmpegReady: false,
  appState: AppUserState.Input,
  uploadedFiles: [],
  outputFormat: "mp4",
  outputFiles: []
};

// Creating custom store. Start at the Input state.
const store = writable(initalState);
const { subscribe, update, set } = store;

// incrementState and decrementState change the application user state.
const incrementState = () => {
  update((state: ApplicationState) : ApplicationState => {
    switch(state.appState) {
      case AppUserState.Input:
        return {...state, appState: AppUserState.Configuration};
      case AppUserState.Configuration:
        return {...state, appState: AppUserState.Process};
      case AppUserState.Process:
        return {...state, appState: AppUserState.Output};
      case AppUserState.Output:
        return {...state, appState: AppUserState.Output};
      default:
        return state;
    }
  });
};

const decrementState = () => {
  update((state: ApplicationState) : ApplicationState => {
    switch(state.appState) {
      case AppUserState.Input:
        return {...state, appState: AppUserState.Input};
      case AppUserState.Configuration:
        return {...state, appState: AppUserState.Input};
      case AppUserState.Process:
        return {...state, appState: AppUserState.Configuration};
      case AppUserState.Output:
        return {...state, appState: AppUserState.Process};
      default:
        return state;
    }
  });
};

const resetApplicationState = () => {
  update((state: ApplicationState) : ApplicationState => {
    // check if ffmpeg has been initalized.
    if (state.ffmpegReady && state.ffmpeg) {
      return {...initalState, ffmpegReady: state.ffmpegReady, ffmpeg: state.ffmpeg}
    }
    return initalState;
  });
};

const addUploadedFiles = (files: File[]) => {
  update((state: ApplicationState) : ApplicationState => {
    const filteredFiles = files.filter((file: File) => {
      // TODO: add support for other video types.
      return file.type == "video/mp4";
    }).map((file: File) => new VideoFile(file));
    return {...state, uploadedFiles: state.uploadedFiles.concat(filteredFiles)};
  });
};

const removeUploadedFile = (id: number) => {
  update((state: ApplicationState) : ApplicationState => {
    const uploadedFiles = state.uploadedFiles
      .filter((videoFile: VideoFile) => {
        return videoFile.id != id;
      });
    return {...state, uploadedFiles};
  });
};

const setOutputFormat = (outputFormat: string) => {
  update((state: ApplicationState) : ApplicationState => {
    return {...state, outputFormat};
  });
};

const setOutputFiles = (outputFiles: VideoFile[]) => {
  update((state: ApplicationState) : ApplicationState => {
    return {...state, outputFiles}
  })
}

export const AppStateStore = {
  subscribe,
  incrementState,
  decrementState,
  resetApplicationState,
  addUploadedFiles,
  removeUploadedFile,
  setOutputFormat,
  setOutputFiles
};

// load ffmpeg and update the application state.
const ffmpeg = createFFmpeg({log: true});
ffmpeg.load()
  .then(() => {
    update((state: ApplicationState) => {
      return {...state, ffmpeg: ffmpeg, ffmpegReady: true};
    });
  });