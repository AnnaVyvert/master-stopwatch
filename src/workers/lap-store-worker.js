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
  const lapId1 = store.findIndex(e=>e.id===id1);
  const lapId2 = store.findIndex(e=>e.id===id2);
  swapEls(store, lapId1, lapId2);
  setValueToStore(LAPS_STORE_NAME, JSON.stringify(store));
}

function swapEls(arr, i1, i2) {
  // arr is mutable
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}