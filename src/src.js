document.addEventListener('DOMContentLoaded', () => {
  getRefTotalTimer.textContent = secToTimeFormat(0);
  updateLapsTableVisibility();
  bindKeys();
  updateTableFromLapStore();
  idCount = findMaxIdInLapStore() + 1;
  getRefSubmitBtn().setAttribute(DISABLED_ATTRIBUTE, true)
});
