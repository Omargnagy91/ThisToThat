// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".container.svelte-1j56woq{display:flex;align-items:center}.file-name-container.svelte-1j56woq{background-color:gray;width:100%;flex:2}.remove-button.svelte-1j56woq{background-color:red;color:white;width:100%;height:100%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}