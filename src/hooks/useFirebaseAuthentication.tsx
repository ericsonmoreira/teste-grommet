import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from '.';
import { fireBaseApp } from '../firebase';

export type FirebaseUserState = User | null;

export interface UseFirebaseAuthState {
  user: FirebaseUserState;
  autenticate: (email: string, password: string) => Promise<void>;
  autenticateWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export const useFirebaseAuth = (): UseFirebaseAuthState => {
  const [user, setUser] = useLocalStorage<FirebaseUserState>('user', null);

  const auth = getAuth(fireBaseApp);

  const autenticate = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const autenticateWithGithub = useCallback(async () => {
    await signInWithPopup(auth, new GithubAuthProvider());
  }, [auth]);

  const signUp = useCallback(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
    },
    [auth]
  );

  const logout = useCallback(async () => {
    await signOut(auth);
  }, [auth]);

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unlisten();
  }, [auth, setUser]);

  return { user, autenticate, autenticateWithGithub, signUp, logout };
};
