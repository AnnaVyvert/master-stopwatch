var PRESENT_NOTE_STORE_NAME = 'present-note';
var TIME_SNAPSHOTS_STORE_NAME = 'time-snapshots';
var snapshots = jsonCRUD(TIME_SNAPSHOTS_STORE_NAME, `[${Date.now()}]`).read();
var sumTime = 0;
var secLap = 0;
var isPlaying = false;
var IsPlayingCheck = (arr = snapshots) => arr.length % 2 === 1;
var updateIsPlaying = () => isPlaying = IsPlayingCheck();
var TIME_SNAPSHOTS_RESET = () => snapshots = IsPlayingCheck() ? [Date.now()] : [Date.now(), Date.now()];
var TIME_SNAPSHOTS_DEFAULT = () => JSON.stringify(TIME_SNAPSHOTS_RESET());
var resizing = false;

function updateTimeVars() {
  secLap = getArraySumTime(snapshots);
  sumTime = secLap + getSumTimeInLapStore();
  updateLabel(sumTime);
}

document.addEventListener('DOMContentLoaded', () => {
  collectStaticEls();

  updateLabel(0);
  updateLapsTableVisibility();
  bindKeyListener();
  bindBackdropHandler();
  setupTableFromLapStore();

  idCount = findMaxIdInLapStore() + 1;

  updateIsPlaying();
  updateButtonVisibility();

  staticEls.presentLapNote.value = getValueFromStore(PRESENT_NOTE_STORE_NAME) ?? '';
  staticEls.bigNote.value = getValueFromStore(ASIDE_NOTE_STORE_NAME) ?? '';

  const asideNoteSize = JSON.parse(getValueFromStore(ASIDE_NOTE_SIZE_STORE_NAME)) ?? [200, 200];
  staticEls.bigNote.style = `width: ${asideNoteSize[0]}px; height: ${asideNoteSize[1]}px;`;

  updateTimeVars();

  if (isPlaying) {
    stopWatch();
  }
  staticEls.uploadFile.addEventListener('change', uploadFile(uploadFileHandler), false);

  staticEls.presentLapNote.addEventListener('input', upperNoteHandleEvent);
  staticEls.bigNote.addEventListener('input', asideNoteHandleEvent);
  staticEls.bigNote.addEventListener('mousedown', asideNoteMouseDownEvent);
  new ResizeObserver(debounce(handleSizeChange)).observe(staticEls.bigNote)
});
