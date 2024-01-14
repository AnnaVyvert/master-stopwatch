function noteHandleEvent(ev) {
  localStorage.setItem(PRESENT_NOTE_STORE_NAME, ev.target ?? '');
}
