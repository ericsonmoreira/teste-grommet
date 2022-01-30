import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { createContext, useCallback, useEffect } from 'react';
import { auth } from '../firebase';
import { useLocalStorage } from '../hooks';

export type FirebaseUserState = User | null;

export interface FirebaseAuthContextState {
  user: FirebaseUserState;
  autenticate: (email: string, password: string) => Promise<void>;
  autenticateWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextState>(
  {} as FirebaseAuthContextState
);

export const FirebaseAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useLocalStorage<FirebaseUserState>('user', null);

  const autenticate = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const autenticateWithGithub = useCallback(async () => {
    await signInWithPopup(auth, new GithubAuthProvider());
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unlisten();
  }, [setUser]);

  return (
    <FirebaseAuthContext.Provider
      value={{ user, autenticate, autenticateWithGithub, signUp, logout }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
