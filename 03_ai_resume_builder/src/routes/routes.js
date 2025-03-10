import { Router } from "express";
import { generateResume } from "../controllers/resume.controller.js";

const router = Router();

router.route("/generate-resume").post(generateResume);

export default router;
