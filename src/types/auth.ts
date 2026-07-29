export type UserRole = 'admin' | 'editor' | 'member' | 'guest';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  user: UserProfile | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}
