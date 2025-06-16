import { BadRequestException, Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(status?: TaskStatus, page?: number, limit?: number): Task[] {
    let filteredTasks = this.tasks;

    if (page < 0 || limit < 0) {
      throw new BadRequestException({
        message: "Only positive numbers in params",
        statusCode: 400,
      });
    }

    if (status) {
      filteredTasks = this.tasks.filter((task) => task.status === status);

      if (!Object.values(TaskStatus).includes(status)) {
        throw new BadRequestException({
          message: "Not valid status",
          statusCode: 400,
        });
      }

      if (filteredTasks.length === 0) {
        throw new BadRequestException({
          message: "Not found task",
          statusCode: 404,
        });
      }
    }

    if (page && limit) {
      const start = (page - 1) * limit;
      const end = start + limit;

      return filteredTasks.slice(start, end);
    }

    return filteredTasks;
  }
}
