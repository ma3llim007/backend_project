import { Router } from "express";
import { generateNewShortUrl } from "../controllers/url.controller.js";

const router = Router();

// Routes
router.route("/").post(generateNewShortUrl);
router.route("/:shortID").get(generateNewShortUrl);

export default router;
