let rows;
let dragSrcEl;
let dropSrcEl;
const DRAGGING_CLASS = 'dragging';
const OVER_DROP_CLASS = 'over-to-drop';

function bindDragAndDrop() {
  rows = document.querySelectorAll(LAPS_CONTAINER_TBODY_TR);
  Array.from(rows).forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
  });
}

function handleDragStart(e) {
  this.classList.add(DRAGGING_CLASS);

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
  this.classList.remove(DRAGGING_CLASS);

  rows.forEach((e) => {
    e.classList.remove(OVER_DROP_CLASS);
  });
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  this.classList.add(OVER_DROP_CLASS);
}

function handleDragLeave(e) {
  this.classList.remove(OVER_DROP_CLASS);
}

function handleDrop(e) {
  e.stopPropagation();
  dropSrcEl = e.target.closest('tr');

  const dragSrcElId = Number(dragSrcEl.id.split(ROW_ID)[1]);
  const dropSrcElId = Number(dropSrcEl.id.split(ROW_ID)[1]);
  if (dragSrcElId === dropSrcElId) return;

  // swapLaps(dragSrcElId, dropSrcElId);
  mergeLaps(dragSrcElId, dropSrcElId)
  setupTableFromLapStore();
  updateTimeVars();
  return false;
}
