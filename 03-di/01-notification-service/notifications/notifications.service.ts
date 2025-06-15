import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  sendEmail(to: string, subject: string, message: string): void {
    console.log(`- Кому: "${to}"\n- Тема: "${subject}"\n- Текст: "${message}"`);
  }

  sendSMS(to: string, message: string): void {
    console.log(`- Кому: ${to}\n- Текст: ${message}`);
  }
}
