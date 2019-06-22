//@ts-check

import { schema } from "./example.js";
import { Renderer } from "./renderer.js";

const renderer = new Renderer(document.body, schema);
renderer.render();
