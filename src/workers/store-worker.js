function getValueFromStore(key) {
  return window.localStorage.getItem(key);
}

function setValueToStore(key, value) {
  window.localStorage.setItem(key, value);
}

function jsonCRUD(storeName, defaultValue = '{}') {
  let store = window.localStorage.getItem(storeName);
  if (!store) {
    setValueToStore(storeName, defaultValue);
    store = defaultValue;
  }
  store = JSON.parse(store);

  return {
    create: (json) => {
      setValueToStore(storeName, JSON.stringify(json, undefined, 2));
    },
    read: () => store,
    update: (key, value) => {
      store[key] = value;
      setValueToStore(storeName, JSON.stringify(store, undefined, 2));
    },
    updateArray: (arr) => {
      setValueToStore(storeName, JSON.stringify(arr));
    },
    delete: () => {
      window.localStorage.removeItem(storeName);
    },
  };
}

function setNewValueToLapStore(value) {
  let store = getValueFromStore(LAPS_STORE_NAME);
  if (store) {
    store = JSON.parse(store);
    store.unshift(value);
    store = JSON.stringify(store, undefined, 2);
  } else {
    store = JSON.stringify([value], undefined, 2);
  }
  setValueToStore(LAPS_STORE_NAME, store);
}

function lapStoreCRUD() {
  let store = preprocessLapStore();
  if (!store) setValueToStore(LAPS_STORE_NAME, '[]');

  return {
    create: () => {
      setValueToStore(LAPS_STORE_NAME, '[]');
    },
    read: () => store,
    readOne: (id) => store.find((el) => el.id === id),
    updateOne: (id, key, value) => {
      const _lap = store.find((el) => el.id === id);
      _lap[key] = value;
      let _store = JSON.stringify(store, undefined, 2);
      setValueToStore(LAPS_STORE_NAME, _store);
    },
    delete: () => {
      setValueToStore(LAPS_STORE_NAME, '[]');
    },
    deleteOne: (id) => {
      let _store = store.filter((el) => el.id !== id);
      _store = JSON.stringify(_store, undefined, 2);
      setValueToStore(LAPS_STORE_NAME, _store);
    },
  };
}

function updateValueInLapStore(id, key, value) {
  let store = preprocessLapStore();
  if (!store) return;

  const lap = store.find((el) => el.id === id);
  lap[key] = value;
  store = JSON.stringify(store, undefined, 2);
  setValueToStore(LAPS_STORE_NAME, store);
}

function deleteValueFromLapStore(id) {
  let store = preprocessLapStore();
  if (!store) return;

  store = store.filter((el) => el.id !== id);
  store = JSON.stringify(store, undefined, 2);
  setValueToStore(LAPS_STORE_NAME, store);
}

function getValueFromLapStore(id) {
  let store = preprocessLapStore();
  if (!store) return;

  return store.find((el) => el.id === id);
}

function updateTableFromLapStore() {
  let store = preprocessLapStore();
  if (!store) return;

  store.reverse().forEach((el) => {
    tableAddRow({
      tableRef: document.querySelector(LAPS_CONTAINER),
      isRowDisabled: el.disabled,
      rowId: el.id,
      data: [el.id, dateToTimeFormat(el.startTime), secToTimeFormat(el.time), el.note, ACTION_BUTTONS(el.id, el.protected)],
      editableData: [
        { width: 86, key: 'time', data: secToTimeFormat(el.time) },
        { width: 218, key: 'note', data: el.note },
      ],
    });
  });

  updateLabel(sumTime);
}
