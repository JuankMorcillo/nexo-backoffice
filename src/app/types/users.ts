export interface User {
  id?: number;
  identifier: number;
  name: string;
  lastname: string;
  email: string;
  avatar_url?: null;
  password?: string;
  status?: number;
  identification_types_id: number;
  roles_ids: number[];
  subscribers_id?: number;
}
