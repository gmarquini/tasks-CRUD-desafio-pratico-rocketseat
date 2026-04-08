import { Router } from 'express'
import { TasksController } from '../controllers/tasksController'
import { upload } from '../middlewares/multer'

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post('/', tasksController.create)
tasksRoutes.get('/', tasksController.index)
tasksRoutes.put('/:id', tasksController.update)
tasksRoutes.delete('/:id', tasksController.remove)
tasksRoutes.patch('/:id/complete', tasksController.complete)
tasksRoutes.post('/upload', upload.single('file'), tasksController.upload)

export { tasksRoutes }
