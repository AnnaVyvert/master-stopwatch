var secCountPrev = 0;
var secCount = 0;
var stopWatchInterval;

var LAPS_CONTAINER = '.laps-container table';
var NOTE_INPUT_CONTAINER = '.control-panel input.note';

const DISABLED_ATTRIBUTE = '_disabled';

var idCount = 1;

var LAPS_STORE_NAME = 'lap-store';

var lockedIcon = 'fa-lock';
var unlockedIcon = 'fa-lock-open';

var ACTION_BUTTONS = (rowId, isLocked) => `
  <button id=${rowId} onclick="protectLap(id)" class="lock"><i class="fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}"></i></button>
  <button id=${rowId} onclick="deleteTime(id)" class="delete"><i class="fa-solid fa-trash"></i></button>
  <button id=${rowId} onclick="disableTime(id)" class="disable"><i class="fa-solid fa-eye-slash"></i></button>
`;

function reset() {
  let store = preprocessLapStore();
  if (!store) return;

  store.forEach((el) => {
    if (getRefAction(el.id).isLocked) return;
    store = store.filter((lap) => lap.id !== el.id);
    getRowRef(el.id).parentElement.remove();
    deleteValueFromLapStore(el.id);
  });

  idCount = findMaxIdInLapStore() + 1;

  secLap=0;
  TIME_SNAPSHOTS_RESET();
  setValueToStore(TIME_SNAPSHOTS_STORE_NAME, JSON.stringify(snapshots));

  updateTimeVars();
  updateButtonVisibility();

  updateIsPlaying();
  updateLapsTableVisibility();
}

function removePresentLapTime() {
  secLap=0;
  TIME_SNAPSHOTS_RESET();

  updateTimeVars();
  updateIsPlaying();
  updateButtonVisibility();

  setValueToStore(TIME_SNAPSHOTS_STORE_NAME, JSON.stringify(snapshots));
}

function start() {
  snapshots.push(Date.now());
  jsonCRUD(TIME_SNAPSHOTS_STORE_NAME).updateArray(snapshots);

  updateIsPlaying();
  updateButtonVisibility();
  stopWatch();
}

function stop() {
  snapshots.push(Date.now());
  jsonCRUD(TIME_SNAPSHOTS_STORE_NAME).updateArray(snapshots);

  updateIsPlaying();
  updateButtonVisibility();
  clearInterval(stopWatchInterval);
}

function protectLap(id) {
  const lockRef = getRefAction(id).lock;
  const iconClassList = lockRef.firstChild.classList;
  const isLocked = iconClassList.contains(lockedIcon);
  iconClassList.replace(isLocked ? lockedIcon : unlockedIcon, isLocked ? unlockedIcon : lockedIcon);
  updateValueInLapStore(Number(id), 'protected', !isLocked);
}

function deleteTime(id) {
  if (getRefAction(id).isLocked) return;
  const elTime = getValueFromLapStore(Number(id)).time;
  if (!getRowRef(id).hasAttribute(DISABLED_ATTRIBUTE)) sumTime -= elTime;
  updateLabel(sumTime);

  getRowRef(id).setAttribute('style', 'display: none');
  deleteValueFromLapStore(Number(id));
  updateLapsTableVisibility();
}

function disableTime(id) {
  const rowRef = getRowRef(id);
  const isRowDisabled = rowRef.hasAttribute(DISABLED_ATTRIBUTE);
  if (!isRowDisabled) {
    getRowRef(id).setAttribute(DISABLED_ATTRIBUTE, true);
    const elTime = getValueFromLapStore(Number(id)).time;
    sumTime -= elTime;
  } else {
    getRowRef(id).removeAttribute(DISABLED_ATTRIBUTE);
    const elTime = getValueFromLapStore(Number(id)).time;
    sumTime += elTime;
  }
  updateLabel(sumTime);
  updateValueInLapStore(Number(id), 'disabled', !isRowDisabled);
}

function submitLap() {
  const timeData = {
    id: idCount,
    startTime: snapshots[0],
    time: getArraySumTime(snapshots),
    note: getRefUpperNote().value.trim() || '-',
    disabled: false,
    position: idCount,
    protected: false,
  };
  tableAddRow({
    tableRef: document.querySelector(LAPS_CONTAINER),
    isRowDisabled: false,
    rowId: timeData.id,
    data: [timeData.id, dateToTimeFormat(timeData.startTime), secToTimeFormat(timeData.time), timeData.note, ACTION_BUTTONS(timeData.id, false)],
    editableData: [
      { width: 86, key: 'time', data: secToTimeFormat(timeData.time) },
      { width: 218, key: 'note', data: timeData.note },
    ],
  });

  secLap = 0;
  TIME_SNAPSHOTS_RESET();
  updateTimeVars();
  idCount++;

  setValueToStore(TIME_SNAPSHOTS_STORE_NAME, JSON.stringify(snapshots));
  getRefUpperNote().value = '';
  setValueToStore(PRESENT_NOTE_STORE_NAME, '');

  setNewValueToLapStore(timeData);
  updateLapsTableVisibility();
}

function updateButtonVisibility() {
  document.querySelector('button.start').hidden = isPlaying;
  document.querySelector('button.stop').hidden = !isPlaying;
}

function stopWatch() {
  stopWatchInterval = setInterval(() => {
    secLap += 1;
    sumTime += 1;
    updateLabel(sumTime);
  }, 1000);
}

function updateLabel(secCount) {
  getRefTotalTimer().textContent = secToTimeFormat(secCount);
  document.title = secToTimeFormat(secCount);
}
