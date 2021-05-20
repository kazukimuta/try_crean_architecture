import { ListTasks } from "./ListTask";
import { TaskRepositoryMock } from "../../../__tests__/interfaces/databases/TaskRepositoryMock";

test("List task", async () => {
  const mock = new TaskRepositoryMock();
  const listTasks = new ListTasks(mock);
  await listTasks.execute();

  expect((<jest.Mock>mock.findAll).mock.calls.length).toBe(1);
});
