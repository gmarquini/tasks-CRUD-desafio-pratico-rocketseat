import Router from "express";
import { tasksRoutes } from "./tasksRoutes.js";

const routes = Router();

routes.use("/tasks", tasksRoutes);

export { routes };
