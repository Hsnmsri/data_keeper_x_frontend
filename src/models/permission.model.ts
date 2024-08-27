import PermissionRole from './permission_role.model';

export default interface Permission {
  id: null | number;
  name: string;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  pivot: PermissionRole | null;
}
