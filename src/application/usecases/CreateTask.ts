import moment from "moment-timezone";
import { Task } from "../../domain/models/Tasks";
import { ITaskRepository } from "../repositories/ITaskRepository";

export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }
  execute(title: string, description: string) {
    let task = new Task(title, description);
    task.createdAt = moment();
    task.updatedAt = moment();
    return this.taskRepository.persist(task);
  }
}
