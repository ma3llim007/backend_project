import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Todo } from "../models/todo.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

// Add New Todo
const addTodo = asyncHandler(async (req, res) => {
    const { title, description, todoStatus } = req.body;

    if (!title || !description || !todoStatus) {
        return res.status(400).json(new ApiError(400, "All Field Are Required"));
    }

    try {
        const newTodo = await Todo.create({ todoTitle: title, todoDescription: description, todoStatus });

        return res.status(201).json(new ApiResponse(201, newTodo, "Todo Added Successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, error.message || "Something Went Wrong While Add New Todo"));
    }
});

// Getting All Todo
const todoListing = asyncHandler(async (req, res) => {
    try {
        const todos = await Todo.find();

        if (!todos.length) {
            return res.status(200).json(new ApiResponse(200, [], "No Todos Found"));
        }

        return res.status(200).json(new ApiResponse(200, todos, "Todo's Fetched Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Something Went Wrong While Fetch Todo Listing"));
    }
});

// View Todo By Todo Id
const viewTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    if (!todoId) {
        return res.status(400).json(new ApiError(400, "Todo ID Is Required"));
    }

    if (!isValidObjectId(todoId)) {
        return res.status(400).json(new ApiError(400, "Todo ID Is Valid"));
    }

    try {
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json(new ApiError(404, "Todo Not Found"));
        }

        return res.status(201).json(new ApiResponse(201, todo, "Todo Fetched Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Something Went Wrong While Fetch View Todo"));
    }
});

// Delete To Todo By Todo Id
const deleteTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    if (!todoId) {
        return res.status(400).json(new ApiError(400, "Todo ID Is Required"));
    }

    if (!isValidObjectId(todoId)) {
        return res.status(400).json(new ApiError(400, "Invalid TODO ID Format"));
    }

    try {
        const deleteResult = await Todo.deleteOne({ _id: todoId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json(new ApiResponse(404, null, "Todo Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, null, "Todo Deleted Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Something Went Wrong While Deleting Todo"));
    }
});

// Toggle Todo Status By Todo Id
const toggleTodoStatus = asyncHandler(async (req, res) => {
    const { todoId } = req.params;
    const { todoStatus } = req.body;
    if (!todoId) {
        return res.status(400).json(new ApiError(400, "Todo ID Is Required"));
    }

    if (!isValidObjectId(todoId)) {
        return res.status(400).json(new ApiError(400, "Invalid TODO ID Format"));
    }

    if (!todoStatus) {
        return res.status(400).json(new ApiError(400, "Todo Status Is Required"));
    }

    try {
        const updateTodo = await Todo.findById(todoId);
        if (todoStatus) {
            updateTodo.todoStatus = todoStatus;
        }

        return res.status(200).json(new ApiResponse(200, updateTodo, "Todo Status Update Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message || "Something Went Wrong While Toggle Todo"));
    }
});

export { addTodo, todoListing, viewTodo, deleteTodo, toggleTodoStatus };
