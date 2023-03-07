import { Injectable } from '@nestjs/common';
import { Mail, MailInterface } from 'src/models/email';

@Injectable()
export class MailService implements MailInterface {
  sendWelcome(payload: Mail) {
    console.log('payload', payload);
  }
}
