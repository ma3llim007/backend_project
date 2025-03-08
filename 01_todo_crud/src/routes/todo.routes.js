import { Router } from "express";
import { addTodo, todoListing, viewTodo, deleteTodo, toggleTodoStatus } from "../controllers/todo.controller.js";

const router = Router();

router.route("/").get(todoListing);
router.route("/add-todo").post(addTodo);
router.route("/view-todo/:todoId").get(viewTodo);
router.route("/delete-todo/:todoId").delete(deleteTodo);
router.route("/toggle-todo/:todoId").patch(toggleTodoStatus);

export default router;
