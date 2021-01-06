<script lang="ts">
    import type { VideoFile } from "src/files/file";
    import { createEventDispatcher } from "svelte";

    export let videoFile: VideoFile;

    const dispatch = createEventDispatcher();

    const handleRemoveButton = () => {
        dispatch("remove", { id: videoFile.id });
    };
</script>

<style>
    .container {
        display: flex;
        align-items: center;
    }

    .file-name-container {
        background-color: gray;
        width: 100%;
        flex: 2;
    }

    .remove-button {
        background-color: red;
        color: white;
        width: 100%;
        height: 100%;
    }
</style>

<div class="container">
    <div class="file-name-container">
        <h3>{videoFile.fileName}</h3>
    </div>
    <div on:click={handleRemoveButton} class="remove-button">remove</div>
</div>