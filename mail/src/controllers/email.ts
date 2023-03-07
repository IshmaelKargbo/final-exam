import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Mail, MailInterface } from 'src/models/email';

@Controller()
export class MailController {
  constructor(private readonly model: MailInterface) {}

  @EventPattern('welcome')
  welcome(@Payload() payload: Mail) {
    return this.model.sendWelcome(payload);
  }
}
