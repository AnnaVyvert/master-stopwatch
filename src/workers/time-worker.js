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
