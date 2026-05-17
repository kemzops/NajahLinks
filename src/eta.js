import { config } from "./config.js";
import { Eta } from "eta";

const eta = new Eta({
  views: config.paths.views,
  cache: config.isProd,
  debug: config.isDev,
});

export function render(view, data = {}) {
  return eta.render(view, data);
}
