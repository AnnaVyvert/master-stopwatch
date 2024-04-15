class ConfirmModal {
  modalSelector = '.popup.modal-confirm'
  modalTitleSelector = '.modal-confirm__title'
  cancelButtonSelector = '.modal-confirm__cancel';
  checkButtonSelector = '.modal-confirm__check';

  setModalTitle(title) {
    document.querySelector(this.modalTitleSelector).textContent = title;
  }

  getButton(buttonSelector) {
    return document.querySelector(`${this.modalSelector} ${buttonSelector}`);
  }

  clickDecorator(onClick, buttonSelector) {
    return () => {
      onClick();
      this.resetButton(buttonSelector);
      staticEls.confirmPopup.close();
    }
  }

  resetButton(buttonSelector) {
    const oldElement = this.getButton(buttonSelector);
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
  }

  constructor(title, onsuccess, oncancel = () => {}) {
    this.setModalTitle(title);

    staticEls.confirmPopup.showModal();

    this.getButton(this.checkButtonSelector).addEventListener('click', this.clickDecorator(onsuccess, this.checkButtonSelector));
    this.getButton(this.cancelButtonSelector).addEventListener('click', this.clickDecorator(oncancel, this.cancelButtonSelector));
  }
}