import { Router } from "express";
import { analytics, generateNewShortUrl, getRedirectWebsite } from "../controllers/url.controller.js";

const router = Router();

// Routes
router.route("/").post(generateNewShortUrl);
router.route("/:shortID").get(getRedirectWebsite);
router.route("/analytics/:shortID").get(analytics);

export default router;
