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