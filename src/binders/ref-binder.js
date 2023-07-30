function getRefTitle() {
  return document.querySelector('title');
}

function getRefTotalTimer() {
  return document.querySelector('.total-time-container .total-time');
}

function getRefUpperNote() {
  return document.querySelector(`.control-panel input.note`);
}

function getRefSubmitBtn() {
  return document.querySelector(`.control-panel button.submit`);
}

function getRowRef(id) {
  return document.querySelector(`tr#${ROW_ID}${id}`);
}

function getRefEditAttribute(rowId, id) {
  return document.querySelector(`tr#${ROW_ID}${rowId} input[id="${id}"]`);
}


function getRefAction(id) {
  const actionSelector = (rowId) => `tr#${ROW_ID}${rowId} button.`;
  return {
    'lock': document.querySelector(actionSelector(id) + 'lock'),
    'isLocked': document.querySelector(actionSelector(id) + 'lock i')?.classList?.contains(lockedIcon),
    'delete': document.querySelector(actionSelector(id) + 'delete'),
    'disable': document.querySelector(actionSelector(id) + 'disable')
  }
}
