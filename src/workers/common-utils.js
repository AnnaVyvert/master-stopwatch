function debounce(func, timeout = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function getClipboardValuePromise() {
  return navigator.clipboard.readText();
}

function setStringToClipboard(s) {
  navigator.clipboard.writeText(s);
}
