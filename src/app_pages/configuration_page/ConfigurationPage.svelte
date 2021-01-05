<script lang="ts">
  import { AppStateStore } from "../../app_state/app-state";

  let format: string;

  // Reactive statement that is triggered when the format changes
  $: {
    AppStateStore.setOutputFormat(format);
  }

  const proceedToOutput = () => {
    AppStateStore.incrementState();
  };

  const goBackToUpload = () => {
    AppStateStore.decrementState();
  }; 
</script>

<h1>Configuration</h1>
<p>Choose an output format:</p>
<select bind:value={format} name="output format">
  <option value="mp4">.mp4</option>
  <option value="mov">.mov</option>
</select>
<button on:click={goBackToUpload}>BACK</button>
<button on:click={proceedToOutput}>NEXT</button>