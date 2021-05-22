import { TasksController } from "./TasksController";
import { TaskRepositoryMock } from "../../../__tests__/interfaces/databases/TaskRepositoryMock";

describe("TaskController", () => {
  test("findTask", async () => {
    const taskRepository = new TaskRepositoryMock();
    const taskController = new TasksController(taskRepository);
    jest.spyOn(taskController["_getTask"], "execute");
    jest.spyOn(taskController["taskSerializer"], "serialize");
    const res = await taskController.findTask({ params: { id: "123" } }, {});

    expect(taskController["_getTask"].execute).toBeCalled();
    expect(
      (<jest.Mock>taskController["_getTask"].execute).mock.calls[0][0]
    ).toBe("123");
    expect(taskController["taskSerializer"].serialize).toBeCalled();
  });

  test("findAllTasks", async () => {
    const taskRepository = new TaskRepositoryMock();
    const taskController = new TasksController(taskRepository);
    jest.spyOn(taskController["_listTask"], "execute");
    jest.spyOn(taskController["taskSerializer"], "serialize");
    const res = await taskController.findAllTasks({}, {});

    expect(taskController["_listTask"].execute).toBeCalled();
    expect(taskController["taskSerializer"].serialize).toBeCalled();
  });

  test("createTask", async () => {
    const taskRepository = new TaskRepositoryMock();
    const taskController = new TasksController(taskRepository);
    jest.spyOn(taskController["_createTask"], "execute");
    jest.spyOn(taskController["taskSerializer"], "serialize");
    const req = {
      body: { title: "testTitle", description: "testDescription" },
    };
    const res = await taskController.createTask(req, {});

    expect(taskController["_createTask"].execute).toBeCalled();
    expect(
      (<jest.Mock>taskController["_createTask"].execute).mock.calls[0][0]
    ).toBe("testTitle");
    expect(
      (<jest.Mock>taskController["_createTask"].execute).mock.calls[0][1]
    ).toBe("testDescription");
    expect(taskController["taskSerializer"].serialize).toBeCalled();
  });

  test("updateTask", async () => {
    const taskRepository = new TaskRepositoryMock();
    const taskController = new TasksController(taskRepository);
    jest.spyOn(taskController["_updateTask"], "execute");
    jest.spyOn(taskController["taskSerializer"], "serialize");
    const req = {
      params: { id: "123" },
      body: { title: "testTitle", description: "testDescription" },
    };
    await taskController.updateTask(req, {});

    expect(taskController["_updateTask"].execute).toBeCalled();
    expect(
      (<jest.Mock>taskController["_updateTask"].execute).mock.calls[0][0]
    ).toBe("123");
    expect(
      (<jest.Mock>taskController["_updateTask"].execute).mock.calls[0][1]
    ).toBe("testTitle");
    expect(
      (<jest.Mock>taskController["_updateTask"].execute).mock.calls[0][2]
    ).toBe("testDescription");
    expect(taskController["taskSerializer"].serialize).toBeCalled();
  });

  test("deleteTask", async () => {
    const taskRepository = new TaskRepositoryMock();
    const taskController = new TasksController(taskRepository);
    jest.spyOn(taskController["_deleteTask"], "execute");
    jest.spyOn(taskController["taskSerializer"], "serialize");
    const req = {
      params: { id: "123" },
    };
    await taskController.deleteTask(req, {});

    expect(taskController["_deleteTask"].execute).toBeCalled();
    expect(
      (<jest.Mock>taskController["_deleteTask"].execute).mock.calls[0][0]
    ).toBe("123");
    expect(taskController["taskSerializer"].serialize).toBeCalled();
  });
});
