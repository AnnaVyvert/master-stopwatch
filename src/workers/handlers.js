const BACKUP_FILE_NAME = 'stopwatch-laps-backup.json';

function exportDataHandler() {
  const store = preprocessLapStore();
  if (!store) return;

  downloadFile(JSON.stringify(store), BACKUP_FILE_NAME);
}

function uploadFileHandler(res) {
  if (!res) return;
  setValueToStore(LAPS_STORE_NAME, res);
  setupTableFromLapStore();
  updateLapsTableVisibility();
  updateTimeVars();
}

function uploadFileRedirect() {
  staticEls.uploadFile.click();
}

function switchFilesFunctionality() {
  if (staticEls.fileFunctionalityOpen.hidden) {
    staticEls.fileFunctionalityOpen.hidden = false;
    staticEls.fileFunctionalityPanel.hidden = true;
  } else {
    staticEls.fileFunctionalityPanel.hidden = false;
    staticEls.fileFunctionalityOpen.hidden = true;
  }
}

function upperNoteHandleEvent(ev) {
  localStorage.setItem(PRESENT_NOTE_STORE_NAME, ev.target.value ?? '');
}

function asideNoteHandleEvent(ev) {
  localStorage.setItem(ASIDE_NOTE_STORE_NAME, ev.target.value ?? '');
}

function handleSizeChange() {
  let el = staticEls.bigNote;
  if ([el.offsetWidth, el.offsetHeight].includes(0)) return;
  setValueToStore(ASIDE_NOTE_SIZE_STORE_NAME, JSON.stringify([el.offsetWidth, el.offsetHeight]));
 }

var POPUP_REF = '.popup';
var ASIDE_NOTE_STORE_NAME = 'aside-note';
var ASIDE_NOTE_SIZE_STORE_NAME = 'aside-note-size';

function handleAsideNotePopup() {
  const isOpen = staticEls.bigNotePopup.open;
  staticEls.bigNotePopup.open = !isOpen;
  const inputRef = staticEls.bigNote;
  inputRef.focus();
}

function handleEditPresentLapTimePopup() {
  staticEls.editPresentLapTimeLabel.textContent = secToTimeFormat(sumTime);
  const inputRef = staticEls.editPresentLapTimeInput;
  const isOpen = staticEls.editPresentLapTimePopup.open;
  staticEls.editPresentLapTimePopup.open = !isOpen;
  inputRef.focus();
}

function handleEditPresentLapTime() {
  const secDiff = getEditPresentLapTimeDiff();

  snapshots[0] += secDiff;
  setValueToStore(TIME_SNAPSHOTS_STORE_NAME, JSON.stringify(snapshots));
  updateTime();
  staticEls.editPresentLapTimeLabel.textContent = secToTimeFormat(sumTime);
}

const INVALID_INPUT_CLASS = 'input-invalid';
function getEditPresentLapTimeDiff() {
  const inputRef = staticEls.editPresentLapTimeInput;
  const timeDiff = inputRef.value;
  const selectSign = staticEls.editPresentLapTimeSelect.value;
  const sign = selectSign === '+' ? 1 : -1;
  // TODO: unhandled errors to invalid class
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