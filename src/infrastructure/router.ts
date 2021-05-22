import express from "express";
import { TasksController } from "../interfaces/controllers/TasksController";

export class ApiRouter {
  private tasksController: TasksController;
  constructor(tasksController: TasksController) {
    this.tasksController = tasksController;
  }

  async getTasks(req: express.Request, res: express.Response) {
    let results = await this.tasksController.findAllTasks(req, res);
    res.send(results);
  }

  async getTaskById(req: express.Request, res: express.Response) {
    let result = await this.tasksController.findTask(req, res);
    res.send(result);
  }

  async postTask(req: express.Request, res: express.Response) {
    let result = await this.tasksController.createTask(req, res);
    res.send(result);
  }

  async patchTask(req: express.Request, res: express.Response) {
    let result = await this.tasksController.updateTask(req, res);
    res.send(result);
  }

  async deleteTask(req: express.Request, res: express.Response) {
    let result = await this.tasksController.deleteTask(req, res);
    res.send(result);
  }

  composeRoute(): express.Router {
    const router = express.Router();
    router.get("/tasks", this.getTasks.bind(this));
    router.get("/tasks/:id", this.getTaskById.bind(this));
    router.post("/tasks", this.postTask.bind(this));
    router.patch("/tasks/:id", this.patchTask.bind(this));
    router.delete("/tasks/:id", this.deleteTask.bind(this));
    return router;
  }
}
