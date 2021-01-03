import { writable } from "svelte/store";

// AppState indicates the current state of the conversion process.
// There are three stages
export enum AppState {
  // The Input stage is where the user imports file(s) that will be converted.
  Input,
  // The Configuration stage is where the specifies how the files will be converted.
  Configuration,
  // The Output stage is where the user will be able to see the output of the conversion
  // and download the converted files.
  Output,
}

// Creating custom store. Start at the Input state.
const { subscribe, set, update } = writable(AppState.Input);

// increment, decrement and 
var increment = () => {
  update((n: AppState) => {
    switch(n) {
      case AppState.Input: 
        return AppState.Configuration;
      case AppState.Configuration: 
        return AppState.Output;
      case AppState.Output: 
        return AppState.Output;
      default:
        return AppState.Input;
    }
  });
};

var decrement = (n: AppState) => {
  update((n: AppState) => {
    switch(n) {
      case AppState.Input: 
        return AppState.Input;
      case AppState.Configuration: 
        return AppState.Input;
      case AppState.Output: 
        return AppState.Configuration;
      default:
        return AppState.Input;
    }
  });
};

var reset = () => {
  set(AppState.Input);
};

export const AppStateStore = {
  subscribe,
  increment,
  decrement,
  reset
}