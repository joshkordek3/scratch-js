import isDefined from '/defined.js';
import Math from '/math.js';
class Display {
  constructor (width, height) {
    this.DOM = document.createElement('canvas');
    document.body.appendChild(this.DOM);
    this.DOM.width = isDefined(width) ? width : 480;
    this.DOM.height = isDefined(height) ? height : 360;
    this.ctx = this.DOM.getContext('2d');
    this.variables = {};
  }
  setVariable (name, value) {
    this.variables[name] = value;
    return this.variables[name];
  }
  getVariable (name) {
    return this.variables[name];
  }
  changeVariable (name, by) {
    return setVariable(name, getVariable(name) + by);
  }
  static htmlCoords (pos, cvs) {
    return {x: pos.x + cvs.width * 0.5, y: cvs.height * 0.5 - pos.y};
  }
  renderRoundedRect (x, y, width, height, color) {
    const w = width * 0.5;
    const h = height * 0.5;
    const p = Math.min(width, height) * 0.25;
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = this.ctx.strokeStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(x + w, y + h);
    this.ctx.arcTo(x - w, y + h, x - w, y - h, p);
    this.ctx.arcTo(x - w, y - h, x + w, y - h, p);
    this.ctx.arcTo(x + w, y - h, x + w, y + h, p);
    this.ctx.arcTo(x + w, y + h, x - w, y + h, p);
    this.ctx.fill();
    this.ctx.restore();
  }
  renderRoundedSquare (x, y, size) {
    this.renderRoundedRect(x, y, size, size);
  }
  renderText (x, y, text, font, color, box) {
    this.ctx.save();
    this.ctx.font = font;
    let measure = this.ctx.measureText(text);
    let h = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
    if (isDefined(box)) this.renderRoundedRect(x, y, measure.width * 1.1, h * 1.1, box);
    this.ctx.textAlign = 'center';
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y + h * 0.32);
    this.ctx.restore();
  }
  renderImage (image, x, y, width, height, direction) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(Math.degToRad(direction));
    this.ctx.drawImage(image, width * -0.5, height * -0.5, width, height);
    this.ctx.restore();
  }
  render (sprite) {
    let w = sprite.costume._renderImage.width * sprite.size / 100;
    let h = sprite.costume._renderImage.height * sprite.size / 100;
    let coords = Display.htmlCoords(sprite.pos, this.DOM);
    this.renderImage(sprite.costume._renderImage, coords.x, coords.y, w, h, sprite.direction);
    if (sprite.message && sprite.message.length > 0) this.renderText(coords.x, coords.y - h * 0.5 - 25 * sprite.size / 100, sprite.message, `${sprite._messageDisplayType === 'think' ? 'italic' : 'bold'} 20px Courier`, 'white', 'rgba(0, 0, 0, 0.5)');
  }
  drawLine (pos1, pos2) {
    pos1 = Display.htmlCoords(pos1, this.DOM);
    pos2 = Display.htmlCoords(pos2, this.DOM);
    this.ctx.beginPath();
    this.ctx.moveTo(pos1.x, pos1.y);
    this.ctx.lineTo(pos2.x, pos2.y);
    this.ctx.stroke();
  }
}
export Display;
