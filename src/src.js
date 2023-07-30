document.addEventListener('DOMContentLoaded', () => {
  updateLabel(0);

  updateLapsTableVisibility();
  bindKeys();
  updateTableFromLapStore();
  idCount = findMaxIdInLapStore() + 1;
  getRefSubmitBtn().setAttribute(DISABLED_ATTRIBUTE, true);

  const presentLapStore = jsonCRUD(PRESENT_LAP_STORE_NAME).read();

  if (presentLapStore?.time || presentLapStore?.time === 0) {
    if (presentLapStore?.isPlaying) {
      // secCount = Math.floor(Date.now() / 1000) - Math.floor(presentLapStore.startTime / 1000);
      secCount = presentLapStore.time;
      secLap = presentLapStore.time;
    } else {
      secCount = presentLapStore.time;
      secLap = presentLapStore.time;
    }
  } else {
    if (presentLapStore?.startTime) {
      secCount = Math.floor(Date.now() / 1000) - Math.floor(presentLapStore.startTime / 1000);
    } else {
      secCount = 0;
    }
  }

  getRefUpperNote().value = presentLapStore?.note ?? '';

  console.log(presentLapStore);
  if (presentLapStore?.isPlaying) {
    start();
  }
  console.warn(sumTime, secCount ?? 0);
  sumTime += secCount;
  updateLabel(sumTime);

  getRefUpperNote().addEventListener('input', noteHandleEvent);
});
