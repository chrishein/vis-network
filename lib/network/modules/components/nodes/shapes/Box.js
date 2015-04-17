'use strict';

import NodeBase from '../util/NodeBase'

class Box extends NodeBase {
  constructor (options, body, labelModule) {
    super(options,body,labelModule);
  }

  resize(ctx, selected) {
    if (this.width === undefined) {
      var margin = 5;
      var textSize = this.labelModule.getTextSize(ctx,selected);
      this.width = textSize.width + 2 * margin;
      this.height = textSize.height + 2 * margin;
    }
  }

  draw(ctx, x, y, selected, hover) {
    this.resize(ctx, selected);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    var borderWidth = this.options.borderWidth;
    var selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;

    ctx.strokeStyle = selected ? this.options.color.highlight.border : hover ? this.options.color.hover.border : this.options.color.border;
    ctx.lineWidth = (selected ? selectionLineWidth : borderWidth);
    ctx.lineWidth /= this.body.view.scale;
    ctx.lineWidth = Math.min(this.width, ctx.lineWidth);

    ctx.fillStyle = selected ? this.options.color.highlight.background : hover ? this.options.color.hover.background : this.options.color.background;

    ctx.roundRect(this.left, this.top, this.width, this.height, this.options.size);

    // draw shadow if enabled
    this.enableShadow(ctx);
    ctx.fill();

    // disable shadows for other elements.
    this.disableShadow(ctx);

    ctx.stroke();

    this.boundingBox.top = this.top;
    this.boundingBox.left = this.left;
    this.boundingBox.right = this.left + this.width;
    this.boundingBox.bottom = this.top + this.height;

    this.labelModule.draw(ctx, x, y, selected);
  }

  distanceToBorder(ctx, angle) {
    this.resize(ctx);
    var a = this.width / 2;
    var b = this.height / 2;
    var w = (Math.sin(angle) * a);
    var h = (Math.cos(angle) * b);
    return a * b / Math.sqrt(w * w + h * h);
  }
}

export default Box;