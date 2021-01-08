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
        height: 100px;
    }

    .file-name-container {
        background-color: black;
        color: white;
        width: 100%;
        height: 100%;
        flex: 6;
        text-align: left;
        font-size: 1rem;

        display: flex;
        align-items: center;
    }

    .file-name-container h3 {
        margin: 0;
        padding-left: 2%;
    }

    .remove-button {
        background-color: white;
        color: red;
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .2s all;
    }

    .remove-button::after {
        content: "\d7";
        font-size: 80px;
        padding: 0;
        margin: 0;
    }

    .remove-button:hover {
        background-color: red;
        color: white;
    }
</style>

<div class="container">
    <div class="file-name-container">
        <h3>{videoFile.fileName}</h3>
    </div>
    <div on:click={handleRemoveButton} class="remove-button" />
</div>