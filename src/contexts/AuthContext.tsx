import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../service/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
  logado: boolean;
}
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}
type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

const [user, setUser] = useState<User>();

useEffect(() => {
  const unsubiscribe = auth.onAuthStateChanged(user => {
    if (user) {
      const { displayName, photoURL, uid } = user

      if (!displayName || !photoURL) {
        throw new Error("Faltam informações da sua conta Google");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        logado: true
      })
    }
  })
  return () => {
    unsubiscribe();
  }
}, [])

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await auth.signInWithPopup(provider);
  if (result.user) {
    const { displayName, photoURL, uid } = result.user

    if (!displayName || !photoURL) {
      throw new Error("Faltam informações da sua conta Google");
    }
    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
      logado: true
    })
  }
}


export function AuthContextProvider(props: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}