import { ITaskRepository } from "../repositories/ITaskRepository";

export class GetTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(id: string) {
    return this.taskRepository.find(id);
  }
}
