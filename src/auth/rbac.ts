// Simple RBAC utility for plugin system
export type Role = 'admin' | 'manager' | 'user';

export const permissions = {
  admin: ['*'],
  manager: ['read', 'write'],
  user: ['read'],
};

export function hasPermission(role: Role, action: string) {
  const allowed = permissions[role];
  return allowed.includes('*') || allowed.includes(action);
}
