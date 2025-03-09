import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefeshTokens.js";
import { isTokenExpired } from "../utils/isTokenExpired.js";
import jwt from "jsonwebtoken";

const HttpOptions = {
    httpOnly: true,
    secure: true,
};

const userVerify = async (req, res, next) => {
    try {
        const currentAccessToken = req.cookies.accessToken;
        const currentRefreshToken = req.cookies.refreshToken;

        // If the access token is valid, pass the request forward
        if (currentAccessToken || !isTokenExpired(currentAccessToken)) {
            req.headers["authorization"] = `Bearer ${currentAccessToken}`;
            // Verify and decode token
            const decodedToken = jwt.verify(currentAccessToken, process.env.ACCESS_TOKEN_SECRET);
            if (!decodedToken?._id) {
                return res.redirect("/login");
            }
            const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
            if (!user) {
                return res.status(401).json(new ApiError(401, "User Not Found"));
            }
            req.user = user;
            return next();
        } else {
            // If no refresh token, return 401
            if (!currentRefreshToken) {
                return res.redirect("/login");
            }

            // Verify the refresh token
            const decodedToken = jwt.decode(currentRefreshToken);

            // Generate new access and refresh tokens
            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(decodedToken._id);

            // Set new tokens in cookies
            res.cookie("accessToken", accessToken, HttpOptions);
            res.cookie("refreshToken", refreshToken, HttpOptions);

            // Update the authorization header with the new access token
            req.headers["authorization"] = `Bearer ${accessToken}`;

            // Verify and decode token
            const decodedToken2 = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if (!decodedToken2?._id) {
                return res.status(401).json(new ApiError(401, "Invalid Access Token: Token Decoding Failed"));
            }
            const user = await User.findById(decodedToken2?._id).select("-password -refreshToken");
            if (!user) {
                return res.status(401).json(new ApiError(401, "User Not Found"));
            }
            req.user = user;
            return next();
        }
    } catch (error) {
        const errorMessage = error.name === "TokenExpiredError" ? "Access Token Expired" : error?.message || "Invalid Access Token";
        res.status(401).json(new ApiError(401, errorMessage));
    }
};

export default userVerify;
