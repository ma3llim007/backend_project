import mongoose, { Schema } from "mongoose";

const todoScheme = new Schema(
    {
        todoTitle: {
            type: String,
            required: [true, "Todo Title Is Required"],
        },
        todoDescription: {
            type: String,
            required: [true, "Todo Description Is Required"],
        },
        todoStatus: {
            type: String,
            enum: ["Not Started", "In Progress", "Done"],
            required: [true, "Todo Status Is Required"],
            default: "Not Started",
        },
    },
    { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoScheme);
