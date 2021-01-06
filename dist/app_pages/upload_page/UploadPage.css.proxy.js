// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#drop-area.svelte-1shw3uz{height:500px;width:500px;border-radius:50%;background-color:black;animation:svelte-1shw3uz-moving-animation infinite 1.6s ease-in-out alternate;margin-bottom:1rem}@keyframes svelte-1shw3uz-moving-animation{from{transform:scale(1)}to{transform:scale(1.02)}}#file-selector.svelte-1shw3uz{visibility:hidden}#file-button.svelte-1shw3uz{font-family:inherit;font-size:inherit;border:none;background:none;cursor:pointer;transition:.2s ease-in-out}#file-button.svelte-1shw3uz:hover{color:#F22B29}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}