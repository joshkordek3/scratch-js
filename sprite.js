import isDefined from 'defined.js';
import { UNIX, delay } from 'time.js';
import { Script, ScriptHandler } from './scripts.js';
class Sprite {
  // name can also be an object
  constructor (name, costumes, x, y, dir, size, visible) {
    if (typeof name === 'object') {
      costumes = name.costumes;
      x = name.position.x;
      y = name.position.y;
      dir = name.direction;
      size = name.size;
      visible = name.isVisible;
      name = name.name;
    }
    x = isDefined(x) ? x : 0;
    y = isDefined(y) ? y : 0;
    dir = isDefined(dir) ? dir : 90;
    size = isDefined(size) ? size : 100;
    visible = isDefined(visible) ? visible : true;
    costumes = isDefined(costumes) ? costumes : [new Costume('costume1', 'https://commons.wikimedia.org/wiki/File:Cards-Blank.svg')];
    self.name = name;
    self.costumes = costumes;
    self.pos = {x: x, y: y};
    self.isVisible = visible;
    self.size = size;
    self.direction = dir;
    self.message = '';
    self._displayTimestamp = NaN;
    self._displayDuration = NaN;
    self._messageDisplayType = undefined;
    self.costume = {number: 1, name: self.costumes[0].name};
    self.scripts = [];
  }
  show () {
    self.isVisible = true;
  }
  hide () {
    self.isVisible = false;
  }
  wait (seconds) {
    self.scriptHandler.exec()
    delay('seconds', seconds);
  }
  _setMesssage (message, seconds, wait) {
    self.message = message;
    self._displayTimestamp = isDefined(seconds) ? UNIX('seconds') : NaN;
    self._displayDuration = isDefined(seconds) ? seconds : NaN;
    if (wait && isDefined(seconds)) self.wait(seconds, script_id);
  }
  say (message, seconds) {
    self._messageDisplayType = 'say';
    self._setMessage(message, seconds, true);
  }
  think (message, seconds) {
    self._messageDisplayType = 'think';
    self._setMessage(message, seconds, true);
  }
  setCostume (costume) {
    self.display = 
  }
}
