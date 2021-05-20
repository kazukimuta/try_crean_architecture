import { DeleteTask } from "./DeleteTask";
import { TaskRepositoryMock } from "../../../__tests__/interfaces/databases/TaskRepositoryMock";
import moment from "moment-timezone/";

test("delete task", async () => {
  const mock = new TaskRepositoryMock();
  const deleteTask = new DeleteTask(mock);
  await deleteTask.execute("12345");

  expect(mock.delete).toBeCalled();
  expect(mock.find).toBeCalled();
  expect((mock.find as jest.Mock).mock.calls[0][0]).toBe("12345");
  expect((mock.delete as jest.Mock).mock.calls[0][0]).toBe(mock.dummyTask);
});
