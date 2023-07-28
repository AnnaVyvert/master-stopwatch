const ACTION_JSON = {
  Space: () => {
    isPlaying ? document.querySelector('button.stop').click() : document.querySelector('button.start').click();
  },
  Enter: () => {
    const isSubmitDisabled = getRefSubmitBtn().hasAttribute(DISABLED_ATTRIBUTE);
    if (isSubmitDisabled) return;
    getRefSubmitBtn().click();
  },
};

function bindKeys() {
  document.addEventListener('keydown', (ev) => {
    if (Object.keys(ACTION_JSON).includes(ev.code)) {
      ACTION_JSON[ev.code]();
    }
  });
}
