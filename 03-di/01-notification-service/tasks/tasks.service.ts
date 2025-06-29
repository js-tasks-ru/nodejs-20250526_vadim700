import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    if (this.usersService.getUserById(assignedTo).email.trim()) {
      await this.notificationsService.sendEmail(
        this.usersService.getUserById(assignedTo).email,
        `Новая задача`,
        `Вы назначены ответственным за задачу: \"${task.title}\"`,
      );
    } else {
      throw new BadRequestException("The email field should not be empty");
    }

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    Object.assign(task, updateTaskDto);

    if (!this.usersService.getUserById(task.assignedTo)) {
      throw new NotFoundException("Такого пользователя не существует");
    }

    if (this.usersService.getUserById(task.assignedTo).phone.trim()) {
      await this.notificationsService.sendSMS(
        this.usersService.getUserById(task.assignedTo).phone,
        `Статус задачи \"${task.title}\" обновлён на \"${task.status}\"`,
      );
    } else {
      throw new BadRequestException(
        "The phone number field should not be empty",
      );
    }

    return task;
  }
}
