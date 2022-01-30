import { useContext } from 'react';
import {
  FirebaseAuthContext,
  FirebaseAuthContextState,
} from '../context/FirebaseAuthContext';

export const useFirebaseAuth = (): FirebaseAuthContextState => {
  return useContext(FirebaseAuthContext);
};
