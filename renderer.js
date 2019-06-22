//@ts-check

import { EntityRenderer } from "./entity-renderer.js";

export class Renderer {
  constructor(container, schema) {
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
    this.container.appendChild(this.canvas);
    this.schema = schema;
    this.entities = this.schema.map(
      (e, i) => new EntityRenderer(e, 50, i * 150)
    );
    this.setupMouse();
  }

  render() {
    const animate = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.entities.forEach(e => {
        this.context.drawImage(e.canvas, e.x, e.y);
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  setupMouse() {
    let moving = false;
    let movingEntities = [];
    this.canvas.addEventListener("mousedown", ev => {
      moving = true;
      movingEntities = this.entities.filter(
        e =>
          ev.offsetX > e.x &&
          ev.offsetX < e.x + e.canvas.width &&
          ev.offsetY > e.y &&
          ev.offsetY < e.y + e.canvas.height
      );
    });
    document.addEventListener("mouseup", () => (moving = false));
    this.canvas.addEventListener("mousemove", ev => {
      if (!moving) return;
      movingEntities.forEach(e => {
        e.x += ev.movementX;
        e.y += ev.movementY;
      });
    });
  }
}
