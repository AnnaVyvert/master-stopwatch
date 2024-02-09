const MINUTE = 60;
const HOUR = MINUTE * 60;

const paddingNumber = (number) => String(number).padStart(2, '0');

function secToTimeFormat(secNumber) {
  return paddingNumber(Math.floor(secNumber / HOUR) % HOUR) +
  ':' +
  paddingNumber(Math.floor(secNumber / MINUTE) % MINUTE) +
  ':' +
  paddingNumber(secNumber % MINUTE);
}

function secToShortTimeFormat(secNumber) {
  return paddingNumber(Math.floor(secNumber / MINUTE) % MINUTE) +
  ':' +
  paddingNumber(secNumber % MINUTE);
}

function dateToTimeFormat(date) {
  const now = new Date(date);
  return paddingNumber(now.getHours()) +
  ':' +
  paddingNumber(now.getMinutes()) +
  ':' +
  paddingNumber(now.getSeconds());
}

function timeFormatToSec(timeFormat) {
  const [hours, minutes, seconds] = timeFormat.split(':');
  return hours * HOUR + minutes * MINUTE + seconds * 1;
}

function getArraySumTime(arr) {
  let elapseTime = 0;
  if (arr.length===0) return 0;

  let arrEven = arr.filter((e,i)=>i%2===0);
  let arrOdd = arr.filter((e,i)=>i%2===1);

  for (let i=0; i<arrEven.length; i++) {
    elapseTime += (arrOdd[i] ?? Date.now()) - arrEven[i];
  }

  return Math.floor(elapseTime / 1000);
}

function lexisTimeToSec(lexis) {
  const labelToSec = {
    "s": 1,
    "m": 60,
    "h": 60 * 60,
    "d": 60 * 60 * 24,
  }

  let secCount = 0;
  const numbersOnly = String(Number(lexis.replace(/\D/g, '')));

  if (numbersOnly.length < lexis.length - 1) {
    throw new Error('invalid lexis format');
  }
  if (numbersOnly.length === lexis.length) {
    secCount = labelToSec['m'] * Number(numbersOnly);
  } else if (numbersOnly.length === lexis.length - 1) {
    secCount = labelToSec[lexis.at(-1)] * Number(numbersOnly);
  } else {
    throw new Error('lexis unhandled exception');
  }
  
  return secCount;
}