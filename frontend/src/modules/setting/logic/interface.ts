export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  username: string;
  state: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: any[];
}
