import { config } from "../config.js";

export function setAuthCookie(res, token) {
  res.cookie(config.cookie.name, token, config.cookie.options);
}

export function clearAuthCookie(res) {
  res.clearCookie(config.cookie.name, {
    path: config.cookie.options.path,
  });
}
