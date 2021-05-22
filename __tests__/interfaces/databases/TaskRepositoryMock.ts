import { Task } from "../../../src/domain/models/Tasks";
import { ITaskRepository } from "../../../src/application/repositories/ITaskRepository";
import moment from "moment-timezone";

export class TaskRepositoryMock extends ITaskRepository {
  public find = jest.fn(async (id: string) => this._dummyTask);
  public persist = jest.fn(async (task: Task) => task);
  public delete = jest.fn(async (task: Task) => task);
  public merge = jest.fn(async (task: Task) => task);
  public findAll = jest.fn(async () => [this._dummyTask]);
  private _dummyTask: Task;
  constructor() {
    super();
    const dummy = new Task("dummy", "dummy");
    dummy.createdAt = moment("2021-01-01");
    dummy.updatedAt = moment("2021-01-01");
    this._dummyTask = dummy;
  }

  get dummyTask(): Task {
    return this._dummyTask;
  }
}

const a = new TaskRepositoryMock();
