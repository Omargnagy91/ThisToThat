<script lang='typescript'>
	import type { ApplicationState } from "./app_state/app-state";
	import { AppStateStore, AppUserState } from "./app_state/app-state";
	import UploadPage from "./app_pages/upload_page/UploadPage.svelte";

	let current_app_state: AppUserState;
	let ffmpeg_ready: boolean;

	const unsubscribe = AppStateStore.subscribe((state: ApplicationState) => {
		current_app_state = state.appState;
		ffmpeg_ready = state.ffmpegReady;
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
	{#if current_app_state == AppUserState.Input}
		<title>ThisToThat - Upload</title>
	{/if}
</svelte:head>
  
<div class="App">
	{#if current_app_state == AppUserState.Input}
		<UploadPage />
	{/if}
</div>
  