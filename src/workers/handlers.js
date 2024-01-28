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
}