import { Router } from "express";
import { auhtRequired } from "../middlewares/validateToken.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
const router = Router();
router.get("/tasks", auhtRequired, getTasks);
router.get("/tasks/:id", auhtRequired, getTask);
router.post("/tasks", auhtRequired, createTask);
router.delete("/tasks/:id", auhtRequired, deleteTask);
router.put("/tasks/:id", auhtRequired, updateTask);
export default router;
