import { Task } from "../../domain/models/Tasks";
import { ITaskRepository } from "../../application/repositories/ITaskRepository";

import moment from "moment-timezone";

let taskList: Task[] = [
  new Task("task1", "taskDesc1"),
  new Task("task2", "taskDesc2"),
  new Task("task3", "taskDesc3"),
  new Task("task4", "taskDesc4"),
  new Task("task5", "taskDesc5"),
];

export class LocalMockRepository extends ITaskRepository {
  constructor() {
    super();
  }

  async find(id: string): Promise<Task> {
    return taskList[0];
  }

  async findAll(): Promise<Array<Task>> {
    return taskList;
  }

  async persist(task: Task): Promise<Task> {
    return task;
  }

  async merge(task: Task): Promise<Task> {
    return task;
  }

  async delete(task: Task): Promise<Task> {
    return task;
  }
}
