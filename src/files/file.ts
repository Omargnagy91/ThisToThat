import { writable, get } from "svelte/store";

// Create  a writeable store for creating ids for files.
const idStore = writable(0);
const { update } = idStore;


// Custom file object for managing files within the application.
export class VideoFile {
  private _file: File;
  private _id: number;
  private _fileUrl: string;

  constructor(file: File) {
    this._file = file;
    // Get the current value of the ID store. and assign it to this file.
    this._id = get(idStore);
    update((id: number) => id + 1);
    
    this._fileUrl = URL.createObjectURL(this.file);
  }

  get file(): File {
    return this._file;
  }
  
  get id(): number {
    return this._id;
  }

  get fileURL(): string {
    return this._fileUrl;
  }

  get fileName(): string {
    return this._file.name;
  }

  get fileSize(): number {
    return this._file.size;
  }
}