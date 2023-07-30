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