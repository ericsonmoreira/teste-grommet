import { useContext } from 'react';
import { AuthContext, AuthContextState } from '../context/AuthContext';

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}
