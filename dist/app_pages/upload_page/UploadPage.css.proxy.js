// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#drop-area.svelte-1dca7ua{height:500px;width:500px;border-radius:50%;background-color:black;animation:svelte-1dca7ua-moving-animation infinite 1.6s ease-in-out alternate;margin-bottom:1rem}@keyframes svelte-1dca7ua-moving-animation{from{transform:scale(1)}to{transform:scale(1.02)}}#file-selector.svelte-1dca7ua{visibility:hidden}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}