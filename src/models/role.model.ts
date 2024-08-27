import Permission from './permission.model';

export default interface Role {
  id: null | number;
  name: null | string;
  description: null | string;
  created_at: null | string;
  updated_at: null | string;
  permissions: Permission[]|null;
}
