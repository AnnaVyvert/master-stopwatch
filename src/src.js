var PRESENT_NOTE_STORE_NAME = 'present-note';
var TIME_SNAPSHOTS_STORE_NAME = 'time-snapshots';
var TIME_SNAPSHOTS_RESET = () => [Date.now()];
var TIME_SNAPSHOTS_DEFAULT = () => JSON.stringify(TIME_SNAPSHOTS_RESET());
var snapshots = jsonCRUD(TIME_SNAPSHOTS_STORE_NAME, TIME_SNAPSHOTS_DEFAULT()).read();
var secLap = 0;
var isPlaying = false;
var IsPlayingCheck = (arr=snapshots) => arr.length % 2 === 1;

document.addEventListener('DOMContentLoaded', () => {
  updateLabel(0);

  updateLapsTableVisibility();
  bindKeys();
  updateTableFromLapStore();
  idCount = findMaxIdInLapStore() + 1;

  isPlaying = IsPlayingCheck();
  updateButtonVisibility();

  getRefUpperNote().value = localStorage.getItem(PRESENT_NOTE_STORE_NAME) ?? '';

  secLap += getArraySumTime(snapshots);
  updateLabel(secLap);
  if (isPlaying) {
    stopWatch();
  }

  getRefUpperNote().addEventListener('input', noteHandleEvent);
});
