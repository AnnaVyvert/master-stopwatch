var PRESENT_NOTE_STORE_NAME = 'present-note';
var TIME_SNAPSHOTS_STORE_NAME = 'time-snapshots';
var snapshots = jsonCRUD(TIME_SNAPSHOTS_STORE_NAME, [Date.now()]).read();
var sumTime = 0;
var secLap = 0;
var isPlaying = false;
var IsPlayingCheck = (arr=snapshots) => arr.length % 2 === 1;
var updateIsPlaying = () => isPlaying = IsPlayingCheck();
var TIME_SNAPSHOTS_RESET = () => snapshots = IsPlayingCheck()? [Date.now()] : [Date.now(), Date.now()];
var TIME_SNAPSHOTS_DEFAULT = () => JSON.stringify(TIME_SNAPSHOTS_RESET());

function updateTimeVars() {
  secLap = getArraySumTime(snapshots);
  sumTime = secLap + getSumTimeInLapStore();
  updateLabel(sumTime);
}

document.addEventListener('DOMContentLoaded', () => {
  updateLabel(0);

  updateLapsTableVisibility();
  bindKeys();
  updateTableFromLapStore();
  idCount = findMaxIdInLapStore() + 1;

  updateIsPlaying();
  updateButtonVisibility();

  getRefUpperNote().value = localStorage.getItem(PRESENT_NOTE_STORE_NAME) ?? '';

  updateTimeVars();

  if (isPlaying) {
    stopWatch();
  }

  getRefUpperNote().addEventListener('input', noteHandleEvent);
});
