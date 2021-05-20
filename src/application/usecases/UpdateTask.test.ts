import { UpdateTask } from "./UpdateTask";
import { TaskRepositoryMock } from "../../../__tests__/interfaces/databases/TaskRepositoryMock";
import moment from "moment-timezone";

test("List task", async () => {
  const mock = new TaskRepositoryMock();
  const updateTask = new UpdateTask(mock);

  const before = moment();
  const result = await updateTask.execute("id", "title", "description");
  const after = moment();

  expect((<jest.Mock>mock.find).mock.calls.length).toBe(1);
  expect((<jest.Mock>mock.find).mock.calls[0][0]).toBe("id");
  expect((<jest.Mock>mock.merge).mock.calls[0][0]["title"]).toBe("title");
  expect((<jest.Mock>mock.merge).mock.calls[0][0]["description"]).toBe(
    "description"
  );
  expect(result.createdAt.valueOf()).not.toEqual(result.updatedAt.valueOf());
  expect(result.updatedAt.valueOf()).toBeGreaterThanOrEqual(before.valueOf());
  expect(result.updatedAt.valueOf()).toBeLessThanOrEqual(after.valueOf());
});
