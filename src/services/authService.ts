import { supabase } from './supabaseClient';
import { UserProfile, UserRole } from '@/types/auth';

export const authService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session?.user) return null;

    // A Role pode ser lida do app_metadata (definida via Supabase / JWT)
    const role = (session.user.app_metadata?.role as UserRole) || 'member';

    return {
      id: session.user.id,
      email: session.user.email || '',
      role,
      fullName: session.user.user_metadata?.full_name,
      avatarUrl: session.user.user_metadata?.avatar_url,
      createdAt: session.user.created_at,
    };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
