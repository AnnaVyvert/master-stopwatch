const BACKUP_FILE_NAME = 'stopwatch-laps-backup.json';

function exportDataHandler() {
  const store = preprocessLapStore();
  if (!store) return;

  downloadFile(JSON.stringify(store), BACKUP_FILE_NAME);
}

const UPLOAD_FILE_REF = 'input[type=file]';
document.querySelector(UPLOAD_FILE_REF).addEventListener('change', uploadFile(uploadFileHandler), false);

function uploadFileHandler(res) {
  if (!res) return;
  setValueToStore(LAPS_STORE_NAME, res);
  setupTableFromLapStore();
  updateLapsTableVisibility();
  updateTimeVars();
}

function uploadFileRedirect() {
  document.querySelector(UPLOAD_FILE_REF).click();
}

const FILE_FUNCTIONALITY_REF = ".file-functionality-open";
const FILE_FUNCTIONALITY_PANEL_REF = ".file-functionality-panel";
function switchFilesFunctionality() {
  if (document.querySelector(FILE_FUNCTIONALITY_REF).hidden) {
    document.querySelector(FILE_FUNCTIONALITY_REF).hidden = false;
    document.querySelector(FILE_FUNCTIONALITY_PANEL_REF).hidden = true;
  } else {
    document.querySelector(FILE_FUNCTIONALITY_PANEL_REF).hidden = false;
    document.querySelector(FILE_FUNCTIONALITY_REF).hidden = true;
  }
}

function upperNoteHandleEvent(ev) {
  localStorage.setItem(PRESENT_NOTE_STORE_NAME, ev.target.value ?? '');
}

function asideNoteHandleEvent(ev) {
  localStorage.setItem(ASIDE_NOTE_STORE_NAME, ev.target.value ?? '');
}

function handleSizeChange() {
  let el = getRefAsideNote();
  if ([el.offsetWidth, el.offsetHeight].includes(0)) return;
  setValueToStore(ASIDE_NOTE_SIZE_STORE_NAME, JSON.stringify([el.offsetWidth, el.offsetHeight]));
 }

var POPUP_REF = '.popup';
var ASIDE_NOTE_REF = '.aside-note';
var ASIDE_NOTE_STORE_NAME = 'aside-note';
var ASIDE_NOTE_SIZE_STORE_NAME = 'aside-note-size';

function handleAsideNotePopup() {
  const isOpen = document.querySelector(POPUP_REF + ASIDE_NOTE_REF).open;
  document.querySelector(POPUP_REF + ASIDE_NOTE_REF).open = !isOpen;
  const inputRef = document.querySelector(POPUP_REF + ASIDE_NOTE_REF + ' textarea');
  inputRef.focus();
}

var EDIT_PRESENT_LAP_TIME_REF = '.edit-present-lap-time';
var TOTALTIME_INFO_REF = '.edit-present-lap-totaltime';
var INVALID_INPUT_CLASS = 'input-invalid';

function handleEditPresentLapTimePopup() {
  document.querySelector(TOTALTIME_INFO_REF).textContent = secToTimeFormat(sumTime);
  const inputRef = document.querySelector(POPUP_REF + EDIT_PRESENT_LAP_TIME_REF + ' input');
  const isOpen = document.querySelector(POPUP_REF + EDIT_PRESENT_LAP_TIME_REF).open;
  document.querySelector(POPUP_REF + EDIT_PRESENT_LAP_TIME_REF).open = !isOpen;
  inputRef.focus();
}

function handleEditPresentLapTime() {
  const secDiff = getEditPresentLapTimeDiff();

  snapshots[0] += secDiff;
  setValueToStore(TIME_SNAPSHOTS_STORE_NAME, JSON.stringify(snapshots));
  updateTime();
  document.querySelector(TOTALTIME_INFO_REF).textContent = secToTimeFormat(sumTime);
}

function getEditPresentLapTimeDiff() {
  const inputRef = document.querySelector(POPUP_REF + EDIT_PRESENT_LAP_TIME_REF + ' input');
  const timeDiff = inputRef.value;
  const selectSign = document.querySelector(POPUP_REF + EDIT_PRESENT_LAP_TIME_REF + ' select').value;
  const sign = selectSign === '+' ? 1 : -1;
  const secDiff = -sign * lexisTimeToSec(timeDiff) * 1000;
  try {
    if (getArraySumTime(snapshots) * 1000 < secDiff) {
      return inputRef.classList.add(INVALID_INPUT_CLASS);
    } else {
      inputRef.classList.remove(INVALID_INPUT_CLASS);
      return secDiff;
    }
  } catch(e) {
    return inputRef.classList.add(INVALID_INPUT_CLASS);
  }
}