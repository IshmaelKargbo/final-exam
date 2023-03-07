import { Permission } from 'src/domain/dto/role';

export const initPermissions = (): Permission[] => {
  return [
    {
      name: 'Dashboard',
      create: false,
      update: false,
      delete: false,
      read: false,
    },
    {
      name: 'User',
      create: false,
      update: false,
      delete: false,
      read: false,
    },
    {
      name: 'Role',
      create: false,
      update: false,
      delete: false,
      read: false,
    },
  ];
};
