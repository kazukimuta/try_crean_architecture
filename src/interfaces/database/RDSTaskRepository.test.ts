import { RDSTaskRepository } from "./RDSTaskRepository";
import { RDBConnectionMock } from "../../../__tests__/interfaces/databases/RDBConnectionMock";
import moment from "moment-timezone";

describe("RDSTaskRepository", () => {
  const now = moment();
  const dummyRowTask = {
    id: "123",
    title: "someTitle",
    description: "someDescription",
    created_at: now,
    updated_at: now,
  };
  test("convertModel", () => {
    const connection = new RDBConnectionMock();
    const target = new RDSTaskRepository(connection);

    const res = target["convertModel"](dummyRowTask);
    expect(res.id).toBe(dummyRowTask.id);
    expect(res.title).toBe(dummyRowTask.title);
    expect(res.description).toBe(dummyRowTask.description);
    expect(res.createdAt.toString()).toBe(
      moment.tz(dummyRowTask.created_at, "UTC").toString()
    );
    expect(res.updatedAt.toString()).toBe(
      moment.tz(dummyRowTask.updated_at, "UTC").toString()
    );
  });
  test("find", async () => {
    const connection = new RDBConnectionMock();
    connection.execute.mockReturnValue([dummyRowTask]);
    const target = new RDSTaskRepository(connection);

    const result = await target.find(dummyRowTask.id);
    expect(connection.execute).toBeCalled();
    expect(connection.execute.mock.calls[0][0]).toBe(
      "select * from tasks where id = ? limit 1"
    );
    expect(connection.execute.mock.calls[0][1]).toBe(dummyRowTask.id);
    // Use .toEqual to compare recursively all properties of object instances (also known as "deep" equality).
    // It calls Object.is to compare primitive values, which is even better for testing than === strict equality operator.
    expect(result).toEqual(target["convertModel"](dummyRowTask));
  });
});
