export class Mail {
  email: string;
  name: string;
  message: string;
}

export abstract class MailInterface {
  abstract sendWelcome(payload: Mail);
}
