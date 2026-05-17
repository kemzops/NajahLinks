/* FOR FUTURE: https://express-rate-limit.mintlify.app/reference/configuration */
import { rateLimit } from "express-rate-limit";
import { config } from "../config.js";
import { render } from "../eta.js";

// const errorTemplate = render("error", {
//   errorCode: config.rateLimit.statusCode,
//   errorMessage: config.rateLimit.message,
// });

export default rateLimit({
  ...config.rateLimit.options,

  handler: (req, res, next, options) => {
    return res.status(config.rateLimit.statusCode).send();
  },
});
