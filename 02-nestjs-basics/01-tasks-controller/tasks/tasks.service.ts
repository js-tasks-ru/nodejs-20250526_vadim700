import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const foundedTask = this.tasks.find((task) => task.id === id);

    if (!foundedTask)
      throw new NotFoundException(`Not found task with id ${id}`);

    return foundedTask;
  }

  createTask(task: Task): Task {
    const { id = null, title, description, status } = task;
    const newTask = {
      id: id,
      title: title,
      description: description,
      status: status,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const { title, description, status } = update;
    const foundedTask = this.tasks.find((task) => task.id === id);

    if (!foundedTask)
      throw new NotFoundException(`Not found task with id ${id}`);

    foundedTask.description = description;
    foundedTask.title = title;
    foundedTask.status = status;

    return foundedTask;
  }

  deleteTask(id: string): Task {
    const foundedTask = this.tasks.find((task) => task.id === id);
    if (!foundedTask)
      throw new NotFoundException(`Not found task with id ${id}`);

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return foundedTask;
  }
}
