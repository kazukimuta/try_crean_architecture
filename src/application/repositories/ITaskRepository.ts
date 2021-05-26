import { Task } from "../../domain/models/Tasks";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export abstract class ITaskRepository {
  abstract findAll(): Promise<Array<Task>>;
  abstract find(id: string): Promise<Task>;
  abstract persist(task: Task): Promise<Task>;
  abstract merge(task: Task): Promise<Task>;
  abstract delete(task: Task): Promise<Task>;
}
