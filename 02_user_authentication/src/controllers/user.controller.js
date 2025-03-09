import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefeshTokens.js";

const HttpOption = {
    httpOnly: true,
    secure: true,
};

// Home Page
const homePage = (req, res) => {
    res.render("index");
};

// Login Page
const loginPage = (req, res) => {
    res.render("login");
};

// Register Page
const registerPage = (req, res) => {
    res.render("register");
};

// Dashboad Page
const dashboardPage = (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    res.render("dashboard", { user: req.user });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        if (!firstName?.trim() || !lastName?.trim() || !username?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(429).json(new ApiError(429, "All Field Are Required"));
        }

        const exitedUser = await User.findOne({ email });
        if (exitedUser) {
            return res.status(409).json(new ApiError(409, "User Is Already Exists, Please Login Or Use A Different Email"));
        }

        const newUser = await User.create({ firstName, lastName, username, email, password });
        return res.status(201).json(new ApiResponse(201, newUser, "User Created Successfully"));
    } catch (_error) {
        return res.status(500).json(new ApiError(500, "Something Went Wrong While Registering User"));
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email?.trim() || !password?.trim()) {
            return res.status(429).json(new ApiError(429, "All Field Are Required"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(new ApiError(404, "No Account Found With This Email."));
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json(new ApiError(401, "Invalid Credentials. Please Check Your Password And Try Again."));
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);
        const loggedInUser = user.toObject();
        delete loggedInUser.password;
        delete loggedInUser.refreshToken;

        return res
            .status(200)
            .cookie("accessToken", accessToken, HttpOption)
            .cookie("refreshToken", refreshToken, HttpOption)
            .json(new ApiResponse(200, loggedInUser, "Login Successful. Welcome back!"));
    } catch (_error) {
        throw new ApiError(500, "Something Went Wrong While Login User");
    }
});

// Logout User
const logOutUser = asyncHandler(async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json(new ApiError(400, "User Not Authenticated"));
        }
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1,
                },
            },
            {
                new: true,
            }
        );
        return res
            .status(200)
            .clearCookie("accessToken", HttpOption)
            .clearCookie("refreshToken", HttpOption)
            .json(new ApiResponse(200, {}, "User Logged Out"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

// User Profile
const profileDetail = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password -refreshToken");

        return res.status(201).json(new ApiResponse(201, user, "User Profile Details Fetched Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message));
    }
});

export { registerUser, loginUser, logOutUser, profileDetail, loginPage, homePage, registerPage, dashboardPage };
