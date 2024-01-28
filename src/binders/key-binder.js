const ACTION_JSON = {
  Space: () => {
    isPlaying ? document.querySelector('button.stop').click() : document.querySelector('button.start').click();
  },
  Enter: () => {
    getRefSubmitBtn().click();
  },
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
    }
  });
}
