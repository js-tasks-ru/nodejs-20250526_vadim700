import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private counterId: number = 1;

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
    const { title, description, status } = task;
    const newTask = {
      id: String(this.counterId++),
      title,
      description,
      status,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const { title, description, status } = update;
    const foundedTask = this.tasks.find((task) => task.id === id);

    if (!foundedTask)
      throw new NotFoundException(`Not found task with id ${id}`);

    if (title) foundedTask.title = title;
    if (description) foundedTask.description = description; 
    if (status) foundedTask.status = status;

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
