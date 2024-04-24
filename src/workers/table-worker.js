const ROW_ID = 'row_';

function findAndProcessLinks(inputText) {
  const replacePattern1 = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
  let replacedText = inputText.replace(replacePattern1, function(match) {
    const lastIndex = Math.max(match.lastIndexOf("/"), match.lastIndexOf("="));
    const linkText = match.slice(lastIndex+1);
    return '<a target="_blank" href="' + match + '">' + linkText + '</a>';
  });

  const replacePattern2 = /(^|[^\/])(www\.[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?)/g;
  replacedText = replacedText.replace(replacePattern2, function(match, group1, group2) {
    const lastIndex = Math.max(group2.lastIndexOf("/"), group2.lastIndexOf("="));
    const linkText = group2.slice(lastIndex+1);
    return group1 + '<a target="_blank" href="http://' + group2 + '">' + linkText + '</a>';
  });

  return replacedText;
}

function editCell(ev, rowId, key) {
  if (getRefAction(rowId).isLocked) return;

  const spanRef = document.querySelector(`tr#${ROW_ID}${rowId} span.${key}`);
  const inputRef = document.querySelector(`tr#${ROW_ID}${rowId} input.${key}`);

  if (ev.srcElement.tagName === 'A' && key === 'note' && spanRef.textContent.split(' ')[1]) return;
  if (spanRef.textContent && spanRef.textContent !== NOTE_CONTENT_EMPTY) {
    if (key === 'note') {
      inputRef.value = getValueFromLapStore(Number(rowId))[key];
    } else if (key === 'time') {
      inputRef.value = spanRef.textContent.trim();
    }
  }

  spanRef.hidden = !spanRef.hidden;
  inputRef.hidden = !inputRef.hidden;

  if (ev.srcElement.tagName !== 'A') {
    inputRef.focus();
  }
}

function switchToStatic(ev, key, rowId) {
  const spanRef = document.querySelector(`tr#${ROW_ID}${rowId} span.${key}`);
  const inputRef = document.querySelector(`tr#${ROW_ID}${rowId} input.${key}`);

  if (key === 'note') {
    const _spanValue = findAndProcessLinks(inputRef.value.trim()) || NOTE_CONTENT_EMPTY;
    spanRef.innerHTML = _spanValue;
    updateValueInLapStore(Number(rowId), key, inputRef.value || NOTE_CONTENT_EMPTY);

    inputRef.hidden = true;
    spanRef.hidden = false;
  } else if (key === 'time') {
    if (inputRef.value == '') return;
    if (!new RegExp('^[0-5][0-9][:][0-5][0-9][:][0-5][0-9]$').test(inputRef.value.trim())) return;
    const oldTime = timeFormatToSec(spanRef.textContent);
    const newTime = timeFormatToSec(inputRef.value);
    spanRef.textContent = inputRef.value;
    updateValueInLapStore(Number(rowId), key, newTime);
    if (!getRowRef(rowId).hasAttribute(DISABLED_ATTRIBUTE)) {
      sumTime += newTime - oldTime;
      updateLabel(sumTime);
    }
    inputRef.hidden = true;
    spanRef.hidden = false;
  }
};

function tableAddRow({ tableRef, isRowDisabled, rowId, data, editableData }) {
  editableData.forEach((el, i) => {
    const ind = data.indexOf(el.data);
    if (el.key === 'time') {
      data[ind] = `
        <input id=${i + 1} class="${el.key} center" hidden style="width: ${el.width}px" title="follow hh:mm:ss format">
        <span id=${i + 1} class="${el.key}" title="click to edit time">
          ${el.data}
        </span>
        <button class="copy-btn" title="copy sum minutes" onclick="handleCopyTime(event)"><i class="fa-solid fa-copy"></i></button>
      `;
    } else if (el.key === 'note') {
      data[ind] = `
        <input id=${i + 1} class="${el.key} center" hidden style="width: ${el.width}px" title="you can also add links here">
        <span id=${i + 1} class="${el.key}" title="click to edit note">
          ${el.data}
        </span>
      `;
    }
  });
  
  const tbodySplitted = tableRef.innerHTML.split('<tbody>');
  const newRow = `
    <tr draggable="true" id=${ROW_ID}${rowId} ${isRowDisabled ? DISABLED_ATTRIBUTE : ''}>
      <td class="drag-point">⣿</td>
      <td>
        ${data.map((e) => e).join('</td><td>')}
      </td>
    </tr>
  `
  tableRef.innerHTML = tbodySplitted[0] + newRow + tbodySplitted[1];
  document.querySelector(`tr[id="${ROW_ID}${rowId}"] span.note`).innerHTML = findAndProcessLinks(editableData[1].data);
}

function addEditOnTouchListener(rowId) {
  document.querySelector(`tr[id="${ROW_ID}${rowId}"] span.time`).addEventListener('click', (ev) => editCell(ev, rowId, 'time'));
  document.querySelector(`tr[id="${ROW_ID}${rowId}"] span.note`).addEventListener('click', (ev) => editCell(ev, rowId, 'note'));
  document.querySelector(`tr[id="${ROW_ID}${rowId}"] input.time`).addEventListener('focusout', (ev) => switchToStatic(ev, 'time', rowId));
  document.querySelector(`tr[id="${ROW_ID}${rowId}"] input.note`).addEventListener('focusout', (ev) => switchToStatic(ev, 'note', rowId));
}

function updateLapsTableVisibility() {
  const lapsContainerRef = staticEls.lapsContainer;
  let store = preprocessLapStore();
  if (!store) return (lapsContainerRef.hidden = true);
  lapsContainerRef.hidden = false;
}
