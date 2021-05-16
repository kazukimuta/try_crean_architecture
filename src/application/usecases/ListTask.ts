import { ITaskRepository } from "../repositories/ITaskRepository";

export class ListTasks {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute() {
    return this.taskRepository.findAll();
  }
}
