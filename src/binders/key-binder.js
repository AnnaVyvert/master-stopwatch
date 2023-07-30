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
        console.log(ev.target.nodeName, ev.target.nodeName === 'INPUT');
        if (ev.target.nodeName !== 'INPUT') {
          ACTION_JSON[ev.code]();
          console.log(22);
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
