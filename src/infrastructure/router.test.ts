import { ApiRouter } from "./router";
import { TasksController } from "../interfaces/controllers/TasksController";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { TaskRepositoryMock } from "../../__tests__/interfaces/databases/TaskRepositoryMock";

describe("router", () => {
  test("getTasks", async () => {
    const taskRepository = new TaskRepositoryMock();
    const taskController = new TasksController(taskRepository);
    jest.spyOn(taskController, "findAllTasks");
    const router = new ApiRouter(taskController);
    await router["getTasks"](getMockReq(), getMockRes().res);
    expect(taskController.findAllTasks).toBeCalled();
  });
  test("getTaskById", async () => {
    const taskRepository = new TaskRepositoryMock();
    const taskController = new TasksController(taskRepository);
    jest.spyOn(taskController, "findTask");
    const router = new ApiRouter(taskController);
    await router["getTaskById"](getMockReq(), getMockRes().res);
    expect(taskController.findTask).toBeCalled();
  });
});
