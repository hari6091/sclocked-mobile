import React, { createContext, useEffect, useMemo, useState } from "react";

import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, setUserLocalStorage } from "./utils";
import api from "../../services/api";
import { Toast } from "native-base";

export const AuthContext = createContext<IContext>({} as IContext);

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<Promise<IUser | null> | IUser | null>();

  useEffect(() => {
    const users = getUserLocalStorage();

    if (users) {
      setUser(users);
    }
  }, []);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const req = await api.post("/login", { email, password });
      const payload = {
        token: req.data.uuid,
        email,
        password,
        role: req.data.role,
      };

      setUser(payload);
      setUserLocalStorage(payload);
    } catch (error) {
      Toast.show({
        title: "Falha ao fazer login",
      });
    }
  };

  const logout = async () => {
    try {
      const user = await api.get("me");

      const payload = {
        email: user.data.email,
        password: user.data.password,
      };

      await api.delete("/logout", { data: payload });

      setUser(null);
      setUserLocalStorage(null);
    } catch (error) {
      throw new Error("Algo deu errado.");
    }
  };

  const auth = useMemo(() => ({ ...user, signIn, logout }), [user]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
