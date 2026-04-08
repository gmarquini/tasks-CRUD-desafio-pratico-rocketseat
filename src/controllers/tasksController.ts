import { Request, Response } from 'express'
import { z } from 'zod'
import { AppError } from '../utils/AppError'
import fs from 'fs'
import crypto from 'crypto'
import { dbPath } from '../utils/dbPath'
import { CSVParser } from '../CSV/importCSV'
import { parse } from 'path'

type file = {
  file: any
}

class TasksController {
  create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z.string().min(3),
      description: z.string().min(3),
    })

    const { title, description } = bodySchema.parse(req.body)

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

    const task = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    db.tasks.push(task)

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

    res.json(task)
  }

  index(req: Request, res: Response) {
    const querySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    })

    const { title, description } = querySchema.parse(req.query)

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

    const tasks = db.tasks.filter((task: any) => {
      return (
        (title
          ? task.title.toLowerCase().includes(title.toLowerCase())
          : true) &&
        (description
          ? task.description.toLowerCase().includes(description.toLowerCase())
          : true)
      )
    })

    res.json(tasks)
  }

  update(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
    })

    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { title, description } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

    const task = db.tasks.find((task: any) => task.id === id)

    if (!task) {
      throw new AppError('Task not found', 404)
    }

    task.title = title
    task.description = description
    task.updated_at = new Date()

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

    res.json(task)
  }

  remove(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(req.params)

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

    const taskExists = db.tasks.some((task: any) => task.id === id)

    if (!taskExists) {
      throw new AppError('Task not found', 404)
    }

    db.tasks = db.tasks.filter((task: any) => task.id !== id)

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

    res.status(204).send()
  }

  complete(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramSchema.parse(req.params)

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

    const task = db.tasks.find((task: any) => task.id === id)

    if (!task) {
      throw new AppError('Task not found', 404)
    }

    task.completed_at = 'completed'

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

    res.json('ok')
  }

  async upload(req: Request, res: Response) {
    const fileSchema = z
      .object({
        filename: z.string().min(1),
        mimetype: z.string().refine((type) => type.includes('csv'), {
          message: 'file must be a CSV format.',
        }),
        size: z
          .number()
          .positive()
          .max(5 * 1024 * 1024, 'File too large (max 5MB)'),
      })
      .passthrough()

    const file = fileSchema.parse(req.file)

    const parsedCSV = await CSVParser(file)

    console.log(parsedCSV)

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

    db.tasks.push(parsedCSV)

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))

    res.json(parsedCSV)
  }
}

export { TasksController }
