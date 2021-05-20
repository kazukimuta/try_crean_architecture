import { GetTask } from "./GetTask";
import { TaskRepositoryMock } from "../../../__tests__/interfaces/databases/TaskRepositoryMock";

test("Get task", async () => {
  const mock = new TaskRepositoryMock();
  const getTask = new GetTask(mock);
  await getTask.execute("12345");

  expect((<jest.Mock>mock.find).mock.calls.length).toBe(1);
  expect((<jest.Mock>mock.find).mock.calls[0][0]).toBe("12345");
});
