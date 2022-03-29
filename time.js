import isDefined from '/defined.js';
function UNIX (timeUnit) {
  if (timeUnit === 'milliseconds' || !isDefined(timeUnit)) return Date.now();
  if (timeUnit === 'seconds') return Date.now() / 1000 | 0;
  if (timeUnit === 'hours') return Date.now() / 60000 | 0;
  if (timeUnit === 'days') return Date.now() / 1440000 | 0;
}
async function delay (timeUnit, amount) {
  let timeObject = {milliseconds: 1, seconds: 1000, hours: 60000, days: 1440000};
  let wait = await (() => (new Promise(resolve => (setTimeout(resolve, timeObject[timeUnit] * amount)))));
}
export { UNIX, delay };
