const keyActions = {
  Space: {
    condition: (ev) => ev.target.nodeName !== 'INPUT' && ev.target.nodeName !== 'TEXTAREA',
    handler: () => {
      isPlaying ? document.querySelector('button.stop').click() : document.querySelector('button.start').click();
    }
  },
  Enter: {
    condition: (ev) => !ev.target.id.length,
    handler: () => {
      getRefSubmitBtn().click();
    }
  },
  Escape: {
    condition: (ev) => true,
    handler: () => {
      const popups = Array.from(document.querySelectorAll(POPUP_REF));
      popups.forEach(e => e.open = false);
    }
  },
}

function bindKeyListener(handler=keyHandler) {
  document.addEventListener('keydown', (ev) => {
    handler(ev);
  });
}

const handlingKeyActions = Object.keys(keyActions);

function keyHandler(ev) {
  if (!handlingKeyActions.includes(ev.code)) return -1;
  if (!keyActions[ev.code].condition(ev)) return -2;
  keyActions[ev.code].handler();
}