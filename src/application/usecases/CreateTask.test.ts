import { CreateTask } from "./CreateTask";
import { TaskRepositoryMock } from "../../../__tests__/interfaces/databases/TaskRepositoryMock";
import moment from "moment-timezone";

test("create task", async () => {
  const mock = new TaskRepositoryMock();
  const createTask = new CreateTask(mock);
  const before = moment();
  const result = await createTask.execute("testTitle", "testDescription");
  const after = moment();
  expect(mock.persist).toBeCalled();
  expect(result.title).toBe("testTitle");
  expect(result.description).toBe("testDescription");
  expect(result.createdAt.valueOf()).toBeGreaterThanOrEqual(before.valueOf());
  expect(result.updatedAt.valueOf()).toBeGreaterThanOrEqual(before.valueOf());
  expect(result.createdAt.valueOf()).toBeLessThanOrEqual(after.valueOf());
  expect(result.updatedAt.valueOf()).toBeLessThanOrEqual(after.valueOf());
});
