import { Router } from "express";
import { analyzeResume, generateCoverLetter, generateResume } from "../controllers/resume.controller.js";

const router = Router();

router.route("/generate-resume").post(generateResume);
router.route("/resume-analyze").post(analyzeResume);
router.route("/generate-cover-letter").post(generateCoverLetter);

export default router;
