<script lang="ts">
  import { AppStateStore, AppUserState } from "../../app_state/app-state";
  import type { VideoFile } from "../../files/file";

  export let outputFiles: VideoFile[];
</script>

<h1>OUTPUT</h1>

{#each outputFiles as video (video.id)}
  <p>{video.fileName}</p>
  <a href={video.fileURL} download={video.fileName}>Download</a>
{/each}

<button on:click={AppStateStore.resetApplicationState}>Back To Start</button>