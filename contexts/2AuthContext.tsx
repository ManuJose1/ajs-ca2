import { createContext, useContext, PropsWithChildren, useEffect, useState } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import * as SecureStore from 'expo-secure-store';
import { IAuthConext } from "@/types";
import axios from "axios";

const AuthContext = createContext<IAuthConext>({});

const TOKEN_KEY = "ajs-ca2-manu";

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)
      console.log("Token", token)

      if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true
        });
      }
    }
    loadToken();
  },[])

  const register = async (full_name: string, email:string, password: string) => {
    try{
      return await axios.post(`${process.env.API_URL}/users/register`, {full_name, email, password});
    } catch(e){
      return{error: true, msg: (e as any).response.data.msg};
    }
  };

  const login = async (email:string, password: string) => {
    try{
      const result = await axios.post(`${process.env.API_URL}/users/login`, {email, password});
      console.log("Login result:", result)
      setAuthState({
        token: result.data.token,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

    } catch(e){
      return{error: true, msg: (e as any).response.data.msg};
    }
  };

    const logout = async () => {
      await SecureStore.deleteItemAsync(TOKEN_KEY);

      axios.defaults.headers.common['Authorization'] = '';

      setAuthState({
        token: null,
        authenticated: false
      });
    };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
