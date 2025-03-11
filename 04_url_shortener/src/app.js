import bodyParser from "body-parser";
import express from "express";
import compression from "compression";
import routes from "./routes/url.routes.js";

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16kb" }));
app.use(compression());

app.use("/", routes);

export default app;
