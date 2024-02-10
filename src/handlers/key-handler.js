const keyActions = {
  Space: {
    condition: (ev) => ev.target.nodeName !== 'INPUT' && ev.target.nodeName !== 'TEXTAREA',
    handler: () => {
      isPlaying ? staticEls.stopButton.click() : staticEls.startButton.click();
    }
  },
  Enter: {
    condition: (ev) => !ev.target.id.length,
    handler: (ev) => {
      if (staticEls.editPresentLapTimePopup.open) {
        staticEls.editPresentLapSubmit.click();
      } else {
        staticEls.presentLapSubmit.click();
      }
    }
  },
  Escape: {
    condition: (ev) => true,
    handler: () => {
      dynamicEls.popups().forEach(e => e.close());
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
  keyActions[ev.code].handler(ev);
}