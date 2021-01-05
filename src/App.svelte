<script lang='typescript'>
	import type { ApplicationState } from "./app_state/app-state";
	import { AppStateStore, AppUserState } from "./app_state/app-state";
	import UploadPage from "./app_pages/upload_page/UploadPage.svelte";
	import ConfigurationPage from "./app_pages/configuration_page/ConfigurationPage.svelte";
	import ProcessPage from "./app_pages/process_page/ProcessPage.svelte";
	import type { VideoFile } from "./files/file";

	let appState: AppUserState;
	let ffmpegReady: boolean;
	let outputFormat: string;
	let uploadedFiles: VideoFile[];

	const unsubscribe = AppStateStore.subscribe((state: ApplicationState) => {
		({appState, ffmpegReady, outputFormat, uploadedFiles} = state);
	});
</script>
  
<style>
	.App {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

<svelte:head>
	{#if appState == AppUserState.Input}
		<title>ThisToThat - Upload</title>
	{/if}
</svelte:head>

<div class="App">
	{#if ffmpegReady}
		{#if appState == AppUserState.Input}
			<UploadPage {uploadedFiles}/>
		{:else if appState == AppUserState.Configuration}
			<ConfigurationPage {outputFormat}/>
		{:else if appState == AppUserState.Process}
			<ProcessPage {uploadedFiles}/>
		{/if}
	{:else}
		<h1>FFMPEG IS LOADING...</h1>
	{/if}
</div>
  