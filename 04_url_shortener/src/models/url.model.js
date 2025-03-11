import mongoose, { Schema } from "mongoose";

const urlScheme = new Schema(
    {
        shortId: {
            type: String,
            required: [true, "Short ID Is Required"],
            unique: true,
        },
        redirectUrl: {
            type: String,
            required: [true, "Re-Direct Url Is Required"],
        },
        visitedHistory: [
            {
                timestamp: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true }
);

export const Url = mongoose.model("Url", urlScheme);
