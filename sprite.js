import isDefined from 'defined.js';
import UNIX from 'time.js';
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
    this.name = name;
    this.costumes = costumes;
    this.pos = {x: x, y: y};
    this.isVisible = visible;
    this.size = size;
    this.direction = dir;
    this.message = '';
    this._displayTimestamp = NaN;
    this._displayDuration = NaN;
    this._messageDisplayType = undefined;
    this.costume = {number: 0, name: this.costumes[0].name};
    this._canvas = display;
    this.layer = display.frontLayer;
    this.scripts = [];
  }
  show () {
    this.isVisible = true;
  }
  hide () {
    this.isVisible = false;
  }
  _setMesssage (message, seconds, wait) {
    this.message = message;
    this._displayTimestamp = isDefined(seconds) ? UNIX('seconds') : NaN;
    this._displayDuration = isDefined(seconds) ? seconds : NaN;
    if (wait && isDefined(seconds)) blocks.control.wait(seconds);
  }
  say (message, seconds) {
    this._messageDisplayType = 'say';
    this._setMessage(message, seconds, true);
  }
  think (message, seconds) {
    this._messageDisplayType = 'think';
    this._setMessage(message, seconds, true);
  }
  setCostume (costume) {
    if (typeof costume === 'number') {
      this.costume = {number: costume, name: this.costumes[costume].name};
    }
    if (typeof costume === 'string') {
      this.costume = {number: this.costumes.indexOf(costume), name: costume};
    }
  }
  changeCostume (number) {
    let costume = (this.costume.number + number) % this.costumes.length;
    if (number < 0) {
      costume = this.costumes.length * (costume < 0) + costume;
    }
    this.setCostume(costume);
  }
  setSize (n) {
    this.size = Math.max(n, 0);
  }
  changeSize (by) {
    setSize(this.size + by);
  }
  layer (n) {
    this.layer = this._canvas.layer(n);
  }
}
export { Sprite, Costume };
