import { TaskSerializer } from "../serializers/TaskSerializer";
import { ITaskRepository } from "../../application/repositories/ITaskRepository";
import { ListTasks } from "../../application/usecases/ListTask";
import { GetTask } from "../../application/usecases/getTask";
import { CreateTask } from "../../application/usecases/CreateTask";
import { UpdateTask } from "../../application/usecases/UpdateTask";
import { DeleteTask } from "../../application/usecases/DeleteTask";

export class TasksController {
  private taskSerializer: TaskSerializer;
  private _getTask: GetTask;
  private _listTask: ListTasks;
  private _createTask: CreateTask;
  private _updateTask: UpdateTask;
  private _deleteTask: DeleteTask;

  constructor(taskRepository: ITaskRepository) {
    this.taskSerializer = new TaskSerializer();
    this._createTask = new CreateTask(taskRepository);
    this._getTask = new GetTask(taskRepository);
    this._listTask = new ListTasks(taskRepository);
    this._updateTask = new UpdateTask(taskRepository);
    this._deleteTask = new DeleteTask(taskRepository);
  }

  async findTask(req: any, res: any) {
    const id = req.params.id;
    let result = await this._getTask.execute(id);
    return this.taskSerializer.serialize(result);
  }

  async findAllTasks(req: any, res: any) {
    let results = await this._listTask.execute();
    return this.taskSerializer.serialize(results);
  }

  async createTask(req: any, res: any) {
    const { title, description } = req.body;
    let result = await this._createTask.execute(title, description);
    return this.taskSerializer.serialize(result);
  }

  async updateTask(req: any, res: any) {
    const id = req.params.id;
    const { title, description } = req.body;
    let result = await this._updateTask.execute(id, title, description);
    return this.taskSerializer.serialize(result);
  }

  async deleteTask(req: any, res: any) {
    const id = req.params.id;
    let result = await this._deleteTask.execute(id);
    return this.taskSerializer.serialize(result);
  }
}
