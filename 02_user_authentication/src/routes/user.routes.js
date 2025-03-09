import { Router } from "express";
import { loginUser, logOutUser, profileDetail, registerUser } from "../controllers/user.controller.js";
import userVerify from "../middleware/userVerify.middleware.js";

const routes = Router();

routes.route("/create-user").post(registerUser);
routes.route("/login").post(loginUser);

// Protected Routes
routes.route("/logout").post(userVerify, logOutUser);
routes.route("/user-profile").get(userVerify, profileDetail);

export default routes;
