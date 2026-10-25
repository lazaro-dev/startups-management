export type UserRole =
  | 'ADMIN'
  | 'COMMITTEE'
  | 'STARTUP_ADMIN'
  | 'COLLABORATOR'
  | 'GUEST'
  | 'SUPPORTER';

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  allowedRoles: UserRole[];
  badge?: string;
}