const getDocumentQS = (selector) => document.querySelector(selector);

// unique static html elements
var staticEls = {};
const staticElsData = [
  { name: 'totalTimer', selector: '.total-time-container .total-time' },
  { name: 'presentLapNote', selector: '.control-panel input.note' },
  { name: 'bigNotePopup', selector: '.popup.aside-note' },
  { name: 'bigNote', selector: '.popup.aside-note textarea' },
  { name: 'editPresentLapTimePopup', selector: '.popup.edit-present-lap-time' },
  { name: 'editPresentLapTimeInput', selector: '.popup.edit-present-lap-time input' },
  { name: 'editPresentLapTimeSelect', selector: '.popup.edit-present-lap-time select' },
  { name: 'editPresentLapTimeLabel', selector: '.popup.edit-present-lap-time .edit-present-lap-totaltime' },
  { name: 'editPresentLapSubmit', selector: '.popup.edit-present-lap-time .edit-present-lap-submit' },
  { name: 'presentLapSubmit', selector: '.control-panel button.submit' },
  { name: 'startButton', selector: 'button.start' },
  { name: 'stopButton', selector: 'button.stop' },
  { name: 'uploadFile', selector: 'input[type=file]' },
  { name: 'lapsTable', selector: '.laps-container table' },
  { name: 'lapsContainer', selector: 'section.laps-container' },
  { name: 'fileFunctionalityOpen', selector: '.file-functionality-open' },
  { name: 'fileFunctionalityPanel', selector: '.file-functionality-panel' },
];
// imitate early access
(function mockStaticEls(elementsData = staticElsData) {
  elementsData.forEach(el => {
    staticEls[el.name] = {};
  });
})();

function collectStaticEls(elementsData = staticElsData) {
  elementsData.forEach(el => {
    staticEls[el.name] = getDocumentQS(el.selector);
  });
  console.log(staticEls);
};

var dynamicEls = {
  popups: () => Array.from(document.querySelectorAll('dialog.popup')),
  tbody: () => getDocumentQS('.laps-container table tbody'),
  lapTableRows: () => Array.from(document.querySelectorAll('.laps-container table tbody tr')),
};

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
