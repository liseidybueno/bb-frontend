// hooks/useAuth.ts
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../store/authSlice';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  return {
    user,
    isAuthenticated,
    loading,
    error,
  };
};
