import { Injectable } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Mail, MailInterface } from 'src/models/email';

@Injectable()
export class MailController {
  constructor(private readonly model: MailInterface) {}

  @MessagePattern({ cmd: 'email-subscriber' })
  async welcomeMail(@Payload() payload: Mail, @Ctx() context: RmqContext) {
    const res = await this.model.sendWelcome(payload);

    const channel = context.getChannelRef();
    const orgMessage = context.getMessage();
    channel.ack(orgMessage);

    return res;
  }
}
