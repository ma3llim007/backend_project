import bodyParser from "body-parser";
import express from "express";
import router from "./routes/routes.js";
import compression from "compression";

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16kb" }));
app.use(compression());

app.use("/api/v1/resume", router);

export default app;
