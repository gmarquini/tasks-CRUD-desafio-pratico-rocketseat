import { Router } from "express";
import { TasksController } from "../controllers/tasksController";

const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.post("/", tasksController.create);

export { tasksRoutes };
