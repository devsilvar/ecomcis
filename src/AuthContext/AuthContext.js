import React, { createContext, useState } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? localStorage.getItem("authToken")
      : null
  );

  const setUserToken = (token) => {
    localStorage.setItem("authToken", token);
    setUser(token);
  };
  const removeUserToken = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };
  const isAuthenticated = () => {
    return user!== null;
  };
  const login = (token) => {
    setUserToken(token);
  };
  const logout = () => {
    removeUserToken();
  };
  const register = (token) => {
    setUserToken(token);
  };
  const contextData = {
    user: user,
    setUser: setUser,
    login: login,
    logout: logout,
    register: register,
    isAuthenticated: isAuthenticated,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );


  // let contextData = {
  //   setUser: setUser,
  //   user: user,
  // };
  // return (
  //   <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  // );
};
