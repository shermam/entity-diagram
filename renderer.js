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

    // TODO the positioning of the entities should be automatic
    this.entities = this.schema.map(
      (e, i) => new EntityRenderer(e, 50, i * 150)
    );
    this.setupConnections();
    this.moving = false;
    this.setupMouse();
  }

  setupConnections() {
    const map = new Map();
    this.entities.forEach(e => map.set(e.entity.name, e));
    this.entities.forEach(e =>
      (e.entity.relations || []).forEach(r =>
        e.relations.push(map.get(r.entity))
      )
    );
  }

  render() {
    const animate = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.entities.forEach(e => this.drawConnections(e));
      this.entities.forEach(e => this.context.drawImage(e.canvas, e.x, e.y));

      if (!this.moving) return;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  drawConnections(e) {
    for (const conn of e.relations) {
      this.context.beginPath();
      this.context.moveTo(e.conn.x + e.x, e.conn.y + e.y);
      this.context.lineTo(conn.conn.x + conn.x, conn.conn.y + conn.y);
      this.context.stroke();
      this.context.closePath();
    }
  }

  setupMouse() {
    let movingEntities = [];
    this.canvas.addEventListener("mousedown", ev => {
      movingEntities = this.entities.filter(
        e =>
          ev.offsetX > e.x &&
          ev.offsetX < e.x + e.canvas.width &&
          ev.offsetY > e.y &&
          ev.offsetY < e.y + e.canvas.height
      );
      this.moving = !!movingEntities.length;
      if (this.moving) this.render();
    });
    document.addEventListener("mouseup", () => (this.moving = false));
    this.canvas.addEventListener("mousemove", ev => {
      if (!this.moving) return;
      movingEntities.forEach(e => {
        e.x += ev.movementX;
        e.y += ev.movementY;
      });
    });
  }
}
