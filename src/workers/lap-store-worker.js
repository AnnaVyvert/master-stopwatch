function findMaxIdInLapStore() {
  let store = preprocessLapStore();
  if (!store) return 0;

  const ids = store.map((e) => e.id);
  return Math.max(...ids);
}

function getSumTimeInLapStore() {
  let store = preprocessLapStore();
  if (!store) return 0;

  return store.reduce((acc, el) => {
    return !el.disabled ? acc + el.time : acc + 0;
  }, 0);
}

function preprocessLapStore() {
  let store = getValueFromStore(LAPS_STORE_NAME);
  if (!store) return 0;
  store = JSON.parse(store);

  if (!store || !store.length) return 0;

  return store;
}

function swapLaps(id1, id2) {
  let store = preprocessLapStore();
  const lapId1 = store.findIndex(e => e.id === id1);
  const lapId2 = store.findIndex(e => e.id === id2);
  swapEls(store, lapId1, lapId2);
  setValueToStore(LAPS_STORE_NAME, JSON.stringify(store));
}

function swapEls(arr, i1, i2) {
  // arr is mutable
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

function isMutationPossible(lap) {
  return !lap['protected'];
}

function mergeNotes(note1, note2) {
  if (note1 !== NOTE_CONTENT_EMPTY && note2 !== NOTE_CONTENT_EMPTY) {
    return `${note1} + ${note2}`
  } else if (note1 === NOTE_CONTENT_EMPTY && note2 === NOTE_CONTENT_EMPTY) {
    return NOTE_CONTENT_EMPTY
  } else {
    return note1 === NOTE_CONTENT_EMPTY ? note2 : note1;
  }
}

function mergeLaps(id1, id2) {
  let store = preprocessLapStore();
  const dragLapId = store.findIndex(e => e.id === id1);
  const dropLapId = store.findIndex(e => e.id === id2);
  const dragLap = store[dragLapId];
  let dropLap = store[dropLapId];
  if (isMutationPossible(dragLap) && isMutationPossible(dropLap)) {
    dropLap = {
      ...dropLap, ...{
        id: dropLap['id'],
        time: dragLap['time'] + dropLap['time'],
        startTime: Math.min(dragLap['startTime'], dropLap['startTime']),
        position: dropLap['position'],
        note: mergeNotes(dragLap['note'], dropLap['note']),
      }
    }
    store[dropLapId] = dropLap;
    store.splice(dragLapId, 1);
    setValueToStore(LAPS_STORE_NAME, JSON.stringify(store));
  }
}