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