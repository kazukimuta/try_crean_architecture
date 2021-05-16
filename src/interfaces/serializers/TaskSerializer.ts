import { Task } from "../../domain/models/Tasks";
import moment from "moment-timezone";

const _serializeSingleTask = (task: Task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    createdAt: task.createdAt.tz("Asia/Tokyo").format(),
    updatedAt: task.updatedAt.tz("Asia/Tokyo").format(),
  };
};

export class TaskSerializer {
  serialize(data: any) {
    if (!data) {
      throw new Error("expect data to be not undefined nor null");
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleTask);
    }
    return _serializeSingleTask(data);
  }
}