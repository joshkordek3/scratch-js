import isDefined from 'defined.js';
import { UNIX, delay } from 'time.js';
import blocks from 'blocks.js';
const Costume = (name, src) => ({name: name, src: src});
class Sprite {
  // display can also be an object
  constructor (display, name, x, y, dir, size, costumes, visible) {
    if (typeof display === 'object') {
      costumes = display.costumes;
      x = display.position.x;
      y = display.position.y;
      dir = display.direction;
      size = display.size;
      visible = display.isVisible;
      name = display.name;
      display = display.display;
    }
    x = isDefined(x) ? x : 0;
    y = isDefined(y) ? y : 0;
    dir = isDefined(dir) ? dir : 90;
    size = isDefined(size) ? size : 100;
    visible = isDefined(visible) ? visible : true;
    costumes = isDefined(costumes) ? costumes : [Costume('costume1', 'https://commons.wikimedia.org/wiki/File:Cards-Blank.svg')];
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
    self.costume = {number: 0, name: self.costumes[0].name};
    self._canvas = display;
    self.layer = display.frontLayer;
    self.scripts = [];
  }
  show () {
    self.isVisible = true;
  }
  hide () {
    self.isVisible = false;
  }
  _setMesssage (message, seconds, wait) {
    self.message = message;
    self._displayTimestamp = isDefined(seconds) ? UNIX('seconds') : NaN;
    self._displayDuration = isDefined(seconds) ? seconds : NaN;
    if (wait && isDefined(seconds)) blocks.control.wait(seconds);
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
    if (typeof costume === 'number') {
      self.costume = {number: costume, name: self.costumes[costume].name};
    }
    if (typeof costume === 'string') {
      self.costume = {number: self.costumes.indexOf(costume), name: costume};
    }
  }
  changeCostume (number) {
    let costume = (self.costume.number + number) % self.costumes.length;
    if (number < 0) {
      costume = self.costumes.length * (costume < 0) + costume;
    }
    self.setCostume(costume);
  }
  setSize (n) {
    self.size = Math.max(n, 0);
  }
  changeSize (by) {
    setSize(self.size + by);
  }
  layer (n) {
    self.layer = self._canvas.layer(n);
  }
}
export { Sprite, Costume };
