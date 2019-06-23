//@ts-check

export class EntityRenderer {
  constructor(entity, x, y) {
    this.x = x;
    this.y = y;
    this.entity = entity;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.fontSize = 50;
    this.gap = this.fontSize / 2;
    this.lineWidth = this.fontSize / 5;
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
    this.context.font = `${this.fontSize}px Arial`;
    const measure = this.context.measureText(name);
    return measure.width;
  }

  drawRect() {
    this.context.beginPath();
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.font = `${this.fontSize}px Arial`;
    this.context.strokeStyle = "#000000";
    this.context.lineWidth = this.lineWidth;
    this.context.fillStyle = "#000000";
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(
      this.entity.name,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.context.stroke();
    this.context.closePath();
  }
}
