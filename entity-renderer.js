//@ts-check
import { config } from "./config.js";

export class EntityRenderer {
  constructor(entity, x, y) {
    this.x = x;
    this.y = y;
    this.entity = entity;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.fontSize = config.entity.fontSize;
    this.gap = config.entity.gap;
    this.lineWidth = config.entity.lineWidth;
    this.width = this.getWidth(entity.name);
    this.canvas.width = this.width + this.gap * 2;
    this.canvas.height = this.fontSize + this.gap;
    this.relations = [];
    this.conn = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    };
    this.drawRect();
  }

  getWidth(name) {
    this.context.font = `${this.fontSize}px ${config.entity.fontName}`;
    const measure = this.context.measureText(name);
    return measure.width;
  }

  drawRect() {
    this.context.beginPath();
    this.context.fillStyle = config.entity.backgroundColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = `${this.fontSize}px ${config.entity.fontName}`;
    this.context.strokeStyle = config.entity.borderColor;
    this.context.lineWidth = this.lineWidth;
    this.context.fillStyle = config.entity.fontColor;
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);

    // TODO Extract text alignment options to config
    // To extract these option the place where the text is drawn
    // also must be dinamic
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      this.entity.name,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.context.stroke();
    this.context.closePath();
  }
}
