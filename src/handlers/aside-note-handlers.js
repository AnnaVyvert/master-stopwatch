function asideNoteHandleEvent(ev) {
  setValueToStore(ASIDE_NOTE_STORE_NAME, ev.target.value ?? '');
}

function asideNoteMouseDownEvent(ev) {
  resizing = true;
}

function handleSizeChange() {
  let el = staticEls.bigNote;
  if ([el.offsetWidth, el.offsetHeight].includes(0)) return -1;
  setValueToStore(ASIDE_NOTE_SIZE_STORE_NAME, JSON.stringify([el.offsetWidth, el.offsetHeight]));
}