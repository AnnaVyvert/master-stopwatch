const keyActions = {
  " ": {
    condition: (ev) => ev.target.nodeName !== 'INPUT' && ev.target.nodeName !== 'TEXTAREA',
    handler: () => {
      isPlaying ? staticEls.stopButton.click() : staticEls.startButton.click();
    }
  },
  Enter: {
    condition: (ev) => !ev.target.id.length,
    handler: (ev) => {
      ev.preventDefault();
      switch(true) {
        case staticEls.editPresentLapTimePopup.open:
          staticEls.editPresentLapSubmit.click();
          break;
        case staticEls.confirmPopup.open:
          getDocumentQS('.modal-confirm__check').click();
          break;
        default:
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
  if (!handlingKeyActions.includes(ev.key)) return -1;
  if (!keyActions[ev.key].condition(ev)) return -2;
  keyActions[ev.key].handler(ev);
}