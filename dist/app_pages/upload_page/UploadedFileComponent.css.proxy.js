// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".container.svelte-ualatp.svelte-ualatp{display:flex;align-items:center;height:100px}.file-name-container.svelte-ualatp.svelte-ualatp{background-color:black;color:white;width:100%;height:100%;flex:6;text-align:left;font-size:1rem;display:flex;align-items:center}.file-name-container.svelte-ualatp h3.svelte-ualatp{margin:0;padding-left:2%}.remove-button.svelte-ualatp.svelte-ualatp{background-color:white;color:red;flex:1;width:100%;height:100%;display:flex;align-items:center;justify-content:center;transition:.2s all}.remove-button.svelte-ualatp.svelte-ualatp::after{content:\"\\d7\";font-size:80px;padding:0;margin:0}.remove-button.svelte-ualatp.svelte-ualatp:hover{background-color:red;color:white}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}