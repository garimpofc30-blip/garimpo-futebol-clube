import { authService } from '@/services/authService';
import { canAccessAdmin } from '@/utils/rbac';

export async function protectAdminRoute() {
  const user = await authService.getCurrentUser();

  if (!user) {
    return {
      redirect: '/login',
      status: 'UNAUTHENTICATED',
    };
  }

  if (!canAccessAdmin(user.role)) {
    return {
      redirect: '/',
      status: 'UNAUTHORIZED',
    };
  }

  return {
    user,
    status: 'AUTHORIZED',
  };
}
