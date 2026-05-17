import "dotenv/config";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { config } from "./config.js";

const app = express();

import limiter from "./middleware/rateLimit.middleware.js";
import page from "./routes/page.routes.js";
import api from "./routes/api.routes.js";

app.disable("x-powered-by");
app.use(helmet(config.helmet));
app.use(compression(config.compression));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded(config.urlEncoded));

app.use(limiter);

app.use(express.static(config.paths.public, { maxAge: config.staticMaxAge }));

app.get("/favicon.ico", (req, res) => res.status(200).send()); // get rid of the annoying console error for the mvp lol
app.use("/api", api);
app.use("/", page);

/* EXPORT APP: Express FOR TESTING */
export default app;