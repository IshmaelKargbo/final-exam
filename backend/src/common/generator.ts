import { User } from 'src/domain/model/user';

export const newPassword = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const welcomeMail = (user: User) => ({
  email: user.email,
  name: `${user.firstName} ${user.lastName}`,
  message: `Dear Ishmael, user this details to access your account username: ${user.username} and password: ${user.password}`,
});
