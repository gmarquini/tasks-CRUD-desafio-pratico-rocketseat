import { Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../utils/AppError";
import fs from "fs";
import crypto from "crypto";
import { dbPath } from "../utils/dbPath";

class TasksController {
  create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z.string().min(3),
      description: z.string().min(3),
    });

    const { title, description } = bodySchema.parse(req.body);

    const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

    const task = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    console.log(task);
    db.tasks.push(task);

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json(task);
  }
}

export { TasksController };
