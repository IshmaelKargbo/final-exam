import * as bcrypt from 'bcrypt';

export const hashText = (text: string, saltRounds?: number) => {
  return bcrypt.hash(text, saltRounds || 10);
};

export const checkText = (text: string, hash: string) => {
  return bcrypt.compare(text, hash);
};
