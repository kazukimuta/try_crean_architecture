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
});
