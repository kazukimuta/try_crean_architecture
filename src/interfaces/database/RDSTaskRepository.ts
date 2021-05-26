import { Task } from "../../domain/models/Tasks";
import { ITaskRepository } from "../../application/repositories/ITaskRepository";
import { IRDBConnection } from "./IRDBConnection";
import moment from "moment-timezone";
import { inject, injectable } from "inversify";
import Symbols from "../../symbols";
import "reflect-metadata";

@injectable()
export class RDSTaskRepository extends ITaskRepository {
  private connection: IRDBConnection;
  constructor(@inject(Symbols.IRDBConnection) connection: IRDBConnection) {
    super();
    this.connection = connection;
  }

  private convertModel(r: any) {
    let task = new Task();

    task.id = r.id;
    task.title = r.title;
    task.description = r.description;
    task.createdAt = moment.tz(r.created_at, "UTC");
    task.updatedAt = moment.tz(r.updated_at, "UTC");

    return task;
  }

  async find(id: string): Promise<Task> {
    let queryResults = await this.connection.execute(
      "select * from tasks where id = ? limit 1",
      id
    );
    return this.convertModel(queryResults[0]);
  }

  async findAll(): Promise<Array<Task>> {
    let queryResults = await this.connection.execute("select * from tasks");
    let results = [];
    results = queryResults.map((m: any) => {
      return this.convertModel(m);
    });

    return results;
  }

  async persist(task: Task): Promise<Task> {
    let result = await this.connection.execute(
      "insert into tasks (title, description, created_at, updated_at) values (?, ?, ?, ?)",
      [
        task.title,
        task.description,
        task.getUTCCreatedAt(),
        task.getUTCUpdatedAt(),
      ]
    );
    task.id = result.insertId;
    return task;
  }

  async merge(task: Task): Promise<Task> {
    let result = await this.connection.execute(
      "update tasks set title = ?, description = ?, updated_at = ? where id = ?",
      [task.title, task.description, task.getUTCUpdatedAt(), task.id]
    );
    return task;
  }

  async delete(task: Task): Promise<Task> {
    let queryResults = await this.connection.execute(
      "delete from tasks where id = ?",
      task.id
    );
    return this.convertModel(task);
  }
}
