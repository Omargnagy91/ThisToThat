import {writable} from "../../web_modules/svelte/store.js";
import {createFFmpeg} from "../../web_modules/@ffmpeg/ffmpeg.js";
import {VideoFile} from "../files/file.js";
export var AppUserState;
(function(AppUserState2) {
  AppUserState2[AppUserState2["Input"] = 0] = "Input";
  AppUserState2[AppUserState2["Configuration"] = 1] = "Configuration";
  AppUserState2[AppUserState2["Process"] = 2] = "Process";
  AppUserState2[AppUserState2["Output"] = 3] = "Output";
})(AppUserState || (AppUserState = {}));
const initalState = {
  ffmpeg: void 0,
  ffmpegReady: false,
  appState: 0,
  uploadedFiles: [],
  outputFormat: "mp4",
  outputFiles: []
};
const store = writable(initalState);
const {subscribe, update, set} = store;
const incrementState = () => {
  update((state) => {
    switch (state.appState) {
      case 0:
        return {...state, appState: 1};
      case 1:
        return {...state, appState: 2};
      case 2:
        return {...state, appState: 3};
      case 3:
        return {...state, appState: 3};
      default:
        return state;
    }
  });
};
const decrementState = () => {
  update((state) => {
    switch (state.appState) {
      case 0:
        return {...state, appState: 0};
      case 1:
        return {...state, appState: 0};
      case 2:
        return {...state, appState: 1};
      case 3:
        return {...state, appState: 2};
      default:
        return state;
    }
  });
};
const resetApplicationState = () => {
  update((state) => {
    if (state.ffmpegReady && state.ffmpeg) {
      return {...initalState, ffmpegReady: state.ffmpegReady, ffmpeg: state.ffmpeg};
    }
    return initalState;
  });
};
const addUploadedFiles = (files) => {
  update((state) => {
    const filteredFiles = files.filter((file) => {
      return file.type == "video/mp4";
    }).map((file) => new VideoFile(file));
    return {...state, uploadedFiles: state.uploadedFiles.concat(filteredFiles)};
  });
};
const removeUploadedFile = (id) => {
  update((state) => {
    const uploadedFiles = state.uploadedFiles.filter((videoFile) => {
      return videoFile.id != id;
    });
    return {...state, uploadedFiles};
  });
};
const setOutputFormat = (outputFormat) => {
  update((state) => {
    return {...state, outputFormat};
  });
};
const setOutputFiles = (outputFiles) => {
  update((state) => {
    return {...state, outputFiles};
  });
};
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
const ffmpeg = createFFmpeg({log: true});
ffmpeg.load().then(() => {
  update((state) => {
    return {...state, ffmpeg, ffmpegReady: true};
  });
});
