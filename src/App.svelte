<script lang='typescript'>
	import { onMount } from 'svelte';
	import { AppState, AppStateStore } from "./app_state/app-state";

	let current_app_state: AppState;

	const unsubscribe = AppStateStore.subscribe((state: AppState) => {
		current_app_state = state;
	});
</script>
  
<style>
	:global(body) {
	  margin: 0;
	  font-family: Arial, Helvetica, sans-serif;
	}
	.App {
	  text-align: center;
	}
	.App code {
	  background: #0002;
	  padding: 4px 8px;
	  border-radius: 4px;
	}
	.App p {
	  margin: 0.4rem;
	}
  
	.App-header {
	  background-color: #f9f6f6;
	  color: #333;
	  min-height: 100vh;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  font-size: calc(10px + 2vmin);
	}
	.App-link {
	  color: #ff3e00;
	}
	.App-logo {
	  height: 36vmin;
	  pointer-events: none;
	  margin-bottom: 3rem;
	  animation: App-logo-spin infinite 1.6s ease-in-out alternate;
	}
	@keyframes App-logo-spin {
	  from {
		transform: scale(1);
	  }
	  to {
		transform: scale(1.06);
	  }
	}
</style>
  
<div class="App">
<header class="App-header">
	<img src="/logo.svg" class="App-logo" alt="logo" />
	<p>Edit <code>src/App.svelte</code> and save to reload.</p>
	<p>
	<a class="App-link" href="https://svelte.dev" target="_blank" rel="noopener noreferrer">
		Learn Svelte
	</a>
	The current_app_state is {current_app_state}
	</p>
</header>
</div>
  