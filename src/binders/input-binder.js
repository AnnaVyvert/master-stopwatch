function noteHandleEvent(ev) {
  const presentLapStore = jsonCRUD(PRESENT_LAP_STORE_NAME).read();

  jsonCRUD(PRESENT_LAP_STORE_NAME).create({
    startTime: presentLapStore.startTime,
    note: ev.target.value,
    time: presentLapStore.time,
    isPlaying: presentLapStore.isPlaying,
  });
}
