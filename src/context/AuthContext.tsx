import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useCallback, useMemo } from 'react';
import { fireBaseApp } from '../firebase';
import { useLocalStorage } from '../hooks';

export const LH = 'application';

export interface IUser {
  uid?: string | null;
  email?: string | null;
  token?: string | null;
  avatar?: string | null;
}

export interface AuthContextState extends IUser {
  autenticate: (email: string, password: string) => Promise<void>;
  autenticateWithGithub: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useLocalStorage<IUser | null>(LH, null);

  const auth = getAuth(fireBaseApp);

  const githubAuthProvider = useMemo(() => new GithubAuthProvider(), []);

  const autenticate = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);

      const currentUser = auth.currentUser;

      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          token: await currentUser.getIdToken(),
          avatar: currentUser.displayName ? currentUser.displayName[0] : '',
        });
      }
    },
    [auth, setUser]
  );

  const autenticateWithGithub = useCallback(async () => {
    const result = await signInWithPopup(auth, githubAuthProvider);

    const credential = GithubAuthProvider.credentialFromResult(result);

    const token = credential?.accessToken;

    const user = result.user;

    if (user) {
      setUser({
        uid: user.uid,
        email: user.email,
        token,
        avatar: user.displayName ? user.displayName[0] : '',
      });
    }
  }, [auth, githubAuthProvider, setUser]);

  const signUp = useCallback(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);

      const currentUser = auth.currentUser;

      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          token: await currentUser.getIdToken(),
          avatar: currentUser.displayName ? currentUser.displayName[0] : '',
        });
      }
    },
    [auth, setUser]
  );

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    return;
  }, [auth, setUser]);

  return (
    <AuthContext.Provider
      value={{ ...user, autenticate, autenticateWithGithub, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
