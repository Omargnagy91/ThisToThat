<script lang="ts">
  import type { ApplicationState } from "../../app_state/app-state";
  import type { VideoFile } from "../../files/file";
  import { AppStateStore } from "../../app_state/app-state";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";

  export let uploadedFiles: VideoFile[];

  let dropArea: HTMLDivElement;
  let fileButton: HTMLInputElement;

  const getRemoveFunction = (id: number) : () => void => {
    return () => AppStateStore.removeUploadedFile(id);
  }

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
    // TODO: add some error handling incase something bad happens.
    if (event.dataTransfer) {
      AppStateStore.addUploadedFiles([...event.dataTransfer.files]);
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
    fileButton.addEventListener("click", () => fileButton.value = null);
  });

  const proceedToConfiguration = () => {
    AppStateStore.incrementState();
  }
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


  #file-selector {
    visibility: hidden;
  }

  #file-button {
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: none;
    cursor: pointer;
    transition: .2s ease-in-out;
  }

  #file-button:hover {
    color: #F22B29;
  }
</style>

<div id="drop-area" bind:this={dropArea}></div>
<input type="file" id="file-selector" multiple bind:this={fileButton} accept="video/*"/>
<span>
  Or
  <button id="file-button" on:click={() => fileButton.click()}>click here to upload files.</button>
</span>
{#each uploadedFiles as file (file.id)}
  <div animate:flip in:scale>
    <p>{file.fileName} [{file.fileSize}bytes]</p>
    <button on:click={getRemoveFunction(file.id)}>X</button>
  </div>
{/each}
{#if uploadedFiles.length}
<button on:click={proceedToConfiguration}>NEXT</button>
{/if}