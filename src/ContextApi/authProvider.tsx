import React, { createContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

type authResponse = {
  params: {
    access_token: string;
  };
  type: string;
}

type User = {
  name: string;
  email: string;
  picture: string;
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => { },
  logout: () => { },
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    try {
      const CLIENT_ID = "196039234046-3qg9pmpv6dhvgo5eq1rb5g966shn8i8r.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@devnetosantos/shopping-list";
      const SCOPE = encodeURI("profile email");
      const RESPONSE_TYPE = "token";

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as authResponse;

      if (type === 'success') {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?all=json&access_token=${params.access_token}`);
        setUser(response.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
