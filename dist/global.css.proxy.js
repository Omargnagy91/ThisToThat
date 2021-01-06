// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@import url('https://fonts.googleapis.com/css2?family=Emblema+One&family=Lato&display=swap');\n\nbody {\n    font-family: Lato;\n    font-size: 1.4rem;\n}\n\nh1 {\n    font-family: Emblema One;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}