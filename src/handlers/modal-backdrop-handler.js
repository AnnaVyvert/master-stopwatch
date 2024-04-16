function modalBackdropHandler(modal) {
  modal.addEventListener('click', function(event) {
    if (event.x === 0 && event.y === 0) return;

    const rect = modal.getBoundingClientRect();
    const isInside = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInside && !resizing) {
      modal.close();
    } else {
      resizing = false;
    }
  });  
}

function bindBackdropHandler(handler=modalBackdropHandler) {
  dynamicEls.popups().forEach(popup => {
    handler(popup);
  });
}