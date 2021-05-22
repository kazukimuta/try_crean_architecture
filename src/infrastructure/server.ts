import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ApiRouter } from "./router";
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
