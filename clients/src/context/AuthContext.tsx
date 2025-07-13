import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import API from "../services/Api";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  token: string;
};

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const login = async (identifier: string, password: string) => {
    const isEmail = identifier.includes("@");
    const loginData = isEmail
      ? { email: identifier, password }
      : { username: identifier, password };

    const res = await API.post("/auth/login", loginData);

    const { user: userData, token } = res.data;
    const fullUser: User = { ...userData, token };

    setUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));
    localStorage.setItem("token", token);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const res = await API.post("/auth/register", {
      username,
      email,
      password,
      firstName,
      lastName,
    });

    const { user: userData, token } = res.data;
    const fullUser: User = { ...userData, token };

    setUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
