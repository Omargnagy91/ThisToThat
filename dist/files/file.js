import {writable, get} from "../../web_modules/svelte/store.js";
const idStore = writable(0);
const {update} = idStore;
export class VideoFile {
  constructor(file) {
    this._file = file;
    this._id = get(idStore);
    update((id) => id + 1);
    this._fileUrl = URL.createObjectURL(this.file);
    this._basename = file.name.replace(/\.[^/.]+$/, "");
  }
  get file() {
    return this._file;
  }
  get id() {
    return this._id;
  }
  get fileURL() {
    return this._fileUrl;
  }
  get fileName() {
    return this._file.name;
  }
  get fileSize() {
    return this._file.size;
  }
  get basename() {
    return this._basename;
  }
}
