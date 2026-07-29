import { UserRole } from '@/types/auth';

const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  editor: 2,
  member: 1,
  guest: 0,
};

export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

export const canAccessAdmin = (userRole?: UserRole): boolean => {
  if (!userRole) return false;
  return hasPermission(userRole, 'editor'); // Admins e Editores acessam a área restrita
};
