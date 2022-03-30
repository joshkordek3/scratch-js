import Math from '/math.js';
import delay from '/time.js';
const blocks = {
  control: {
    wait: (t) => (delay('seconds', t)),
    waitWhile: (condition) => (while (true) if (condition()) break; else delay('milliseconds', 10))
  }
};
export blocks;
