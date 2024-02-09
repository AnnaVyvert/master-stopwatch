const ACTION_JSON = {
  Space: () => {
    isPlaying ? document.querySelector('button.stop').click() : document.querySelector('button.start').click();
  },
  Enter: () => {
    getRefSubmitBtn().click();
  },
  Escape: () => {
    const popups = Array.from(document.querySelectorAll(POPUP_REF));
    popups.forEach(e => e.open = false);
  }
};

function bindKeys() {
  document.addEventListener('keydown', (ev) => {
    switch (ev.code) {
      case 'Space':
        if (ev.target.nodeName !== 'INPUT' && ev.target.nodeName !== 'TEXTAREA') {
          ACTION_JSON[ev.code]();
        }
        break;
      case 'Enter':
        if (!ev.target.id.length) {
          ACTION_JSON[ev.code]();
        }
        break;
      case 'Escape':
        ACTION_JSON[ev.code]();
        break;
    }
  });
}
