import { Task } from "./Tasks";
import moment from "moment-timezone";

describe("Tasks", () => {
  test("setter, getter", () => {
    const task = new Task();
    const params = {
      id: "testid",
      title: "testtitle",
      description: "testdescription",
      now: moment(),
    };
    task.id = params.id;
    task.title = params.title;
    task.description = params.description;
    task.createdAt = params.now;
    task.updatedAt = params.now;
    expect(task.id).toBe(params.id);
    expect(task.title).toBe(params.title);
    expect(task.description).toBe(params.description);
    expect(task.createdAt).toBe(params.now);
    expect(task.updatedAt).toBe(params.now);
  });
  test("formatted time", () => {
    const task = new Task();
    const now = moment();
    task.createdAt = now;
    task.updatedAt = now;
    expect(task.getUTCCreatedAt()).toBe(
      now.utc().format("YYYY-MM-DD HH:mm:ss")
    );
    expect(task.getUTCUpdatedAt()).toBe(
      now.utc().format("YYYY-MM-DD HH:mm:ss")
    );
  });
});
