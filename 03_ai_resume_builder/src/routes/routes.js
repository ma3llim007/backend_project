import { Router } from "express";
import { analyzeResume, generateResume } from "../controllers/resume.controller.js";

const router = Router();

router.route("/generate-resume").post(generateResume);
router.route("/resume-analyze").post(analyzeResume);

export default router;
