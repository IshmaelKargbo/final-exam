export const APP_PERMISSION = ['Dashboard', 'User', 'Role', 'Permission'];

export const STATUS = ['PENDING', 'COMPLETE'];

export interface ApiResponse {
  statusCode: number;
  message?: string;
  record?: any;
  records?: any[];
}
