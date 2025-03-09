import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import userRouter from "./routes/user.routes.js";
import pageRouter from "./routes/routes.js";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", "./src/views/"); // Add Custom View Path
app.use(express.static(path.join(__dirname, "public"))); // Set Public Folder

// Pages Routes
app.use("/", pageRouter);

// Routes
app.use("/api/v1/user", userRouter);

export default app;
