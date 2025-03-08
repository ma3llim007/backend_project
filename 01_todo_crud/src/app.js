import bodyParser from "body-parser";
import express from "express";
const app = express();
import todoRoutes from "./routes/todo.routes.js";

// Middleware
app.use(bodyParser.json({ limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/todo", todoRoutes);

export default app;
