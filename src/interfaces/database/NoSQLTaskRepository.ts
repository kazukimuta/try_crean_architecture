import { Task } from "../../domain/models/Tasks";
import { ITaskRepository } from "../../application/repositories/ITaskRepository";
import { INoSQLDBConnection } from "./INoSQLDBConnection";
import moment from "moment-timezone";

export class NoSQLTaskRepository extends ITaskRepository {
  private connection: INoSQLDBConnection;
  constructor(connection: INoSQLDBConnection) {
    super();
    this.connection = connection;
  }

  private convertModel(r: any) {
    let task = new Task();
    task.id = this.connection.idToString(r._id);
    task.title = r.title;
    task.description = r.description;
    task.createdAt = moment.tz(r.created_at, "UTC");
    task.updatedAt = moment.tz(r.updated_at, "UTC");
    return task;
  }

  async find(id: string): Promise<Task> {
    const queryResult = await this.connection.finds({ id });
    return this.convertModel(queryResult[0]);
  }

  async findAll(): Promise<Array<Task>> {
    const queryResults = await this.connection.finds();
    const result = queryResults.map((m) => {
      return this.convertModel(m);
    });
    return result;
  }

  async persist(task: Task): Promise<Task> {
    const result = await this.connection.insert({
      title: task.title,
      description: task.description,
      created_at: task.getUTCCreatedAt(),
      updated_at: task.getUTCUpdatedAt(),
    });
    const resultAsTaks = this.convertModel(result);
    return resultAsTaks;
  }

  async merge(task: Task): Promise<Task> {
    const result = await this.connection.update({ id: task.id }, task);
    const resultAsTaks = this.convertModel(result);
    return resultAsTaks;
  }

  async delete(task: Task): Promise<Task> {
    const result = await this.connection.delete({ id: task.id });
    return this.convertModel(task);
  }
}
