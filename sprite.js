import isDefined from 'defined.js';
import Function from 'cloning.js';
import UNIX from 'time.js';
import blocks from 'blocks.js';
const Costume = (name, src) => {
  let img = new Image();
  img.src = src;
  return {name: name, src: src, _renderImage: img};
};
class Sprite {
  // display can also be an object
  constructor (layerHandler, name, x, y, dir, size, costumes, visible) {
    if (typeof layerHandler === 'object') {
      costumes = layerHandler.costumes;
      x = layerHandler.position.x;
      y = layerHandler.position.y;
      dir = layerHandler.direction;
      size = layerHandler.size;
      visible = layerHandler.isVisible;
      name = layerHandler.name;
      layerHandler = layerHandler.display;
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
    this._messageDisplayType = undefined;
    this.setCostume(0);
    this._layerHandler = layerHandler;
    this.layer = layerHandler.layer('front');
    this.scripts = [];
  }
  show () {
    this.isVisible = true;
    return this.isVisible();
  }
  hide () {
    this.isVisible = false;
    return this.isVisible():
  }
  _setMesssage (message, seconds, wait) {
    this.message = message;
    if (isDefined(seconds)) {
      let func = () => {
        blocks.control.wait(seconds);
        this.message = '';
      };
      if (wait) func();
      else setTimeout(func, 0);
    }
    return this.message;
  }
  say (message, seconds, async) {
    this._messageDisplayType = 'say';
    return this.this._setMessage(message, seconds, !async);
  }
  think (message, seconds, async) {
    this._messageDisplayType = 'think';
    return this.this._setMessage(message, seconds, !async);
  }
  setCostume (costume) {
    if (typeof costume === 'number') {
      this.costume = this.costumes[Math.constrain(costume, 0, this.costumes.length];
    }
    if (typeof costume === 'string') {
      return setCostume(this._getCostumeIndex(costume)]);
    }
    return this.costume;
  }
  changeCostume (number) {
    let costume = (this.costume.number + number) % this.costumes.length;
    if (number < 0) {
      costume = this.costumes.length * (costume < 0) + costume;
    }
    return this.setCostume(costume);
  }
  setSize (n) {
    this.size = Math.max(n, 0);
    return this.size;
  }
  changeSize (by) {
    return setSize(this.size + by);
  }
  setLayer (n) {
    if (n === 'front' || n === 'last') {
      this.layer = this._layerHandler.layer(n);
    } else {
      this.layer = this._layerHandler.layer(Math.max(n, 0));
    }
    return this.layer;
  }
  static forever (func) {
   this._appendScript(func, () => (true));
  }
  _appendScript (func, repeatWhile) {
    this.scripts.push(Function(`return ${String(func)}`)());
  }
  appendScript (func, repeatWhile) {
    this._appendScript(func, typeof repeatWhile === 'function' ? repeatWhile : () => (false));
  }
}
export { Sprite, Costume };
