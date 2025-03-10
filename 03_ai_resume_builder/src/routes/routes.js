import { Router } from "express";
import { analyzeResume, findingMissingKeyword, generateCoverLetter, generateResume } from "../controllers/resume.controller.js";

const router = Router();

router.route("/generate-resume").post(generateResume);
router.route("/resume-analyze").post(analyzeResume);
router.route("/generate-cover-letter").post(generateCoverLetter);
router.route("/finding-missing-keyword").post(findingMissingKeyword);

export default router;
