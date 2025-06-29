import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    console.log(`- Кому: "${to}"\n- Тема: "${subject}"\n- Текст: "${message}"`);
  }

  async sendSMS(to: string, message: string): Promise<void> {
    console.log(`- Кому: ${to}\n- Текст: ${message}`);
  }
}
