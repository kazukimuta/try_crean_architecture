import express from "express";
import dotenv from "dotenv";
import { TasksController } from "../interfaces/controllers/TasksController";
import { MysqlConnection } from "./MysqlConnection";
import { TaskRepository } from "../interfaces/database/RDSTaskRepository";
import { NoSQLTaskRepository } from "../interfaces/database/NoSQLTaskRepository";
import { MongodbConnection } from "./MongodbConnection";
import { ITaskRepository } from "../application/repositories/ITaskRepository";

function getTaskRepository(): ITaskRepository {
  dotenv.config();
  switch (process.env.DB_TYPE) {
    case "mongo":
      const mongodbConnection = new MongodbConnection();
      mongodbConnection.connect().then(() => {
        console.log("ok");
      });
      return new NoSQLTaskRepository(mongodbConnection);

    case "mysql":
    default:
      const mysqlConnection = new MysqlConnection();
      return new TaskRepository(mysqlConnection);
  }
}

const tasksController = new TasksController(getTaskRepository());

let router = express.Router();

router.get("/tasks", async (req: express.Request, res: express.Response) => {
  let results = await tasksController.findAllTasks(req, res);
  res.send(results);
});

router.get(
  "/tasks/:id",
  async (req: express.Request, res: express.Response) => {
    let result = await tasksController.findTask(req, res);
    res.send(result);
  }
);

router.post("/tasks", async (req: express.Request, res: express.Response) => {
  let result = await tasksController.createTask(req, res);
  res.send(result);
});

router.patch(
  "/tasks/:id",
  async (req: express.Request, res: express.Response) => {
    let result = await tasksController.updateTask(req, res);
    res.send(result);
  }
);

router.delete(
  "/tasks/:id",
  async (req: express.Request, res: express.Response) => {
    let result = await tasksController.deleteTask(req, res);
    res.send(result);
  }
);

export default router;
