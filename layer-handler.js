class LayerHandler {
  constructor () {
    this.layers = 0;
    this._backs = 0;
  }
  layer (val) {
    let e = this.layers++;
    if (val === 'front') return () => (e + this._backs);
    if (val === 'back') {
      let f = this._backs++;
      return () => (this._backs - f - 1);
    }
    return () => (val + this._backs);
  }
  render (display, sprites) {
    let l = sprites.length;
    for (let r = 0; r < l; r++) {
      let s = sprites.map(sprite => sprite.layer());
      let i = s.indexOf(Math.max(...s));
      display.render(sprites[i]);
      sprites.splice(i, 1);
    }
  }
}
