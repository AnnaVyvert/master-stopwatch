const ROW_ID = 'row_';

function editCell(rowId, id, key) {
  const spanRef = document.querySelector(`tr#${ROW_ID}${rowId} span[id="${id}"]`);
  const inputRef = document.querySelector(`tr#${ROW_ID}${rowId} input[id="${id}"]`);
  if (spanRef.textContent && spanRef.textContent !== '-') {
    inputRef.value = spanRef.textContent;
  }
  spanRef.hidden = !spanRef.hidden;
  inputRef.hidden = !inputRef.hidden;
  inputRef.addEventListener('input', (ev) => {
    if (ev.data === ' ') {
      setTimeout(() => {
        isPlaying ? stop() : start();
      });
    }
  });
  inputRef.addEventListener('focusout', (ev) => {
    if (key === 'note') {
      spanRef.textContent = inputRef.value.trim() || '-';
      updateValueInLapStore(Number(rowId), key, inputRef.value.trim() || '-');
      inputRef.hidden = true;
      spanRef.hidden = false;
    } else if (key === 'time') {
      if (inputRef.value == '') return;
      if (!new RegExp('^[0-5][0-9][:][0-5][0-9][:][0-5][0-9]$').test(inputRef.value.trim())) return;
      const oldTime = timeFormatToSec(spanRef.textContent);
      const newTime = timeFormatToSec(inputRef.value);
      spanRef.textContent = inputRef.value;
      updateValueInLapStore(Number(rowId), key, newTime);
      sumTime += newTime - oldTime;
      updateLabel(sumTime);
      inputRef.hidden = true;
      spanRef.hidden = false;
    }
  });
}

function tableAddRow({ tableRef, isRowDisabled, rowId, data, editableData }) {
  editableData.forEach((el, i) => {
    const ind = data.indexOf(el.data);
    data[ind] = `
    <input id=${i + 1} class=${el.key} hidden style="width: ${el.width}">
    <span id=${i + 1} class=${el.key} onclick="editCell(${rowId}, ${i + 1}, '${el.key}')">
      ${el.data}
    </span>`;
  });

  tableRef.innerHTML =
    `
      <tr id=${ROW_ID}${rowId} ${isRowDisabled ? DISABLED_ATTRIBUTE : ''}>
        <td>
          ${data.map((e) => e).join('</td><td>')}
        </td>
      </tr>
    ` + tableRef.innerHTML;
}

function updateLapsTableVisibility() {
  const lapsContainerRef = document.querySelector('section.laps-container');
  // let store = getValueFromStore(LAPS_STORE_NAME);
  // if (!store) return (lapsContainerRef.hidden = true);
  // store = JSON.parse(store);
  // if (isArrayEmpty(store)) return (lapsContainerRef.hidden = true);
  let store = preprocessLapStore();
  if (!store) return (lapsContainerRef.hidden = true);
  lapsContainerRef.hidden = false;
}
