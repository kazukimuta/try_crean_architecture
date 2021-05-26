import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ApiRouter } from "./router";
import { TasksController } from "../interfaces/controllers/TasksController";
import { ITaskRepository } from "../application/repositories/ITaskRepository";
import Symbols from "../symbols";
import { container } from "../inversify.config";

function getTaskRepository(): ITaskRepository {
  dotenv.config();
  switch (process.env.DB_TYPE) {
    case "mongo":
      return container.get<ITaskRepository>(Symbols.NoSQLTaskRepository);

    case "local":
      return container.get<ITaskRepository>(Symbols.LocalTaskRepository);

    case "mysql":
    default:
      return container.get<ITaskRepository>(Symbols.RDSTaskRepository);
  }
}

const tasksController = new TasksController(getTaskRepository());
const apiRoute = new ApiRouter(tasksController);

const app = express();

// bodyがundefinedにならないように
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route設定
app.use("/api", apiRoute.composeRoute());

app.listen(3000, () => {
  console.log("listening on port 3000");
});

export default app;
