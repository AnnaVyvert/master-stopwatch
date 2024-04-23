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

function editCell(rowId, id, key) {
  if (getRefAction(rowId).isLocked) return;
  const spanRef = document.querySelector(`tr#${ROW_ID}${rowId} span[id="${id}"]`);
  const inputRef = document.querySelector(`tr#${ROW_ID}${rowId} input[id="${id}"]`);
  if (spanRef.textContent && spanRef.textContent !== NOTE_CONTENT_EMPTY) {
    inputRef.value = getValueFromLapStore(Number(rowId))[key];
  }
  spanRef.hidden = !spanRef.hidden;
  inputRef.hidden = !inputRef.hidden;

  if (inputRef.getAttribute('data-hasListener')) return;
  inputRef.addEventListener('focusout', (ev) => {
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
  });
  inputRef.setAttribute('data-hasListener', true);
}

function tableAddRow({ tableRef, isRowDisabled, rowId, data, editableData }) {
  editableData.forEach((el, i) => {
    const ind = data.indexOf(el.data);
    if (el.key === 'time') {
      data[ind] = `
        <input id=${i + 1} class="${el.key} center" hidden style="width: ${el.width}px" title="follow hh:mm:ss format">
        <span id=${i + 1} class="${el.key}" onclick="editCell(${rowId}, ${i + 1}, '${el.key}')" title="click to edit time">
          ${el.data}
        </span>
        <button class="copy-btn" title="copy sum minutes" onclick="handleCopyTime(event)"><i class="fa-solid fa-copy"></i></button>
      `;
    } else if (el.key === 'note') {
      data[ind] = `
        <input id=${i + 1} class="${el.key} center" hidden style="width: ${el.width}px" title="you can also add links here">
        <span id=${i + 1} class="${el.key}" onclick="editCell(${rowId}, ${i + 1}, '${el.key}')" title="click to edit note">
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

function updateLapsTableVisibility() {
  const lapsContainerRef = staticEls.lapsContainer;
  let store = preprocessLapStore();
  if (!store) return (lapsContainerRef.hidden = true);
  lapsContainerRef.hidden = false;
}
