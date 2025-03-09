import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userScheme = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name Is Required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name Is Required"],
            trim: true,
        },
        username: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Username Is Required"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email Is Required"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timeseries: true }
);

// hashing the password
userScheme.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (error) {
        return next(error);
    }
});

// checking password is correct
userScheme.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password, this.password);
};

// generating access token
userScheme.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, username: this.username, fullName: `${this.firstName} ${this.lastName}` }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

// generating refresh Token
userScheme.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

export const User = mongoose.model("User", userScheme);
