import { Router } from "express";
import { dashboardPage, homePage, loginPage, registerPage } from "../controllers/user.controller.js";
import userVerify from "../middleware/userVerify.middleware.js";

const router = Router();

router.route("/").get(homePage);
router.route("/login").get(loginPage);
router.route("/register").get(registerPage);

router.route("/dashboard").get(userVerify, dashboardPage);

export default router;
