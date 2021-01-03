<script lang="ts">
  import type { ApplicationState } from "../../app_state/app-state";
  import { AppStateStore } from "../../app_state/app-state";
  import { onMount } from "svelte";

  let dropArea: HTMLDivElement;
  let fileButton: HTMLInputElement;

  const handleDragOver = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    // TODO: add some error handling incase something bad happens.
    if (event.dataTransfer)
      event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    let fileList: File[];
    // TODO: add some error handling incase something bad happens.
    if (event.dataTransfer) {
      fileList = [...event.dataTransfer.files];
      AppStateStore.addUploadedFiles(fileList);
    }
  }

  const handleFileButtonChange = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.target) {
      let fileList = (<HTMLInputElement>event.target).files;
      if (fileList)
        AppStateStore.addUploadedFiles([...fileList]);
    }
  }

  onMount(() => {
    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("drop", handleDrop);
    fileButton.addEventListener("change", handleFileButtonChange);
  });

  let unsubscribe = AppStateStore.subscribe((state: ApplicationState) => {
    console.log(state.UploadedFiles);
  });
</script>

<style>
  #drop-area {
    height: 500px;
    width: 500px;
    border-radius: 50%;
    background-color: black;
    animation: moving-animation infinite 1.6s ease-in-out alternate;
    margin-bottom: 1rem;
  }

  @keyframes moving-animation {
    from {
      transform: scale(1);
    } to {
      transform: scale(1.02);
    }
  }
</style>

<div id="drop-area" bind:this={dropArea}></div>
<input type="file" id="file-selector" multiple bind:this={fileButton}>