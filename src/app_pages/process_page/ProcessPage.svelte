<script lang="ts">
  import type { FFmpeg } from "@ffmpeg/ffmpeg";
  import { fetchFile } from "@ffmpeg/ffmpeg";
  import { AppStateStore } from "../../app_state/app-state";
  import { VideoFile } from "../../files/file";
  import { onMount } from "svelte";

  export let uploadedFiles: VideoFile[];
  export let ffmpeg: FFmpeg;
  export let outputFormat: string;

  console.log(uploadedFiles);

  let outputFiles: VideoFile[] = [];

  let progressRatio: number = 0;

  $: progress = 100 * progressRatio;

  const processUploadedFiles = async () => {

    // Hook into the ffmpeg command progress
    ffmpeg.setProgress(({ ratio }) => {
      progressRatio = ratio;
    });

    for (let index = 0; index < uploadedFiles.length; index++) {
      const video = uploadedFiles[index];

      // Add the video file to the ffmpeg file system.
      ffmpeg.FS('writeFile', video.fileName, await fetchFile(video.fileURL));

      // Convert video file.
      await ffmpeg.run("-i", video.fileName, `${video.id}.${outputFormat}`);

      // Retrive the output file.
      const data: Uint8Array = ffmpeg.FS('readFile', `${video.id}.${outputFormat}`);

      const outputFile = new File([new Blob([data.buffer])], `${video.basename}.${outputFormat}`)

      outputFiles = [...outputFiles, new VideoFile(outputFile)];
    }

    // TODO: Probably need to do some cleanup here.
    
    AppStateStore.incrementState();
  }

  // Start Processing files when the component has mounted.
  onMount(() => {
    processUploadedFiles();
  });
</script>

<h2>QUEUE</h2>
<ol>
  {#each uploadedFiles as video (video.id)}
    <li>{video.fileName}</li>
  {/each}
</ol>

<h1>CURRENT JOB PROGRESS: {progress}</h1>

<h2>FINISHED</h2>
<ol>
  {#each outputFiles as video (video.id)}
    <li>{video.fileName}</li>
  {/each}
</ol>