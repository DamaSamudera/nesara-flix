/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useMutationAuth from "../hooks/useMutationAuth";

type AuthContextTypes = {
  login: any;
  logOut: any;
  signUpAction: any;
  user: any;
};

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextTypes | null>(null);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<any>(null);

  const { logOut, login, signUpAction } = useMutationAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUpAction, login, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
