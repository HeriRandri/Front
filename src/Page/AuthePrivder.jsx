import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  axios.defaults.baseURL = "https://backfichier.onrender.com/";

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/check-auth", { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.auth) {
        setUser(response.data.user);
        Modal.success({ content: "Login successful" });
        location.assign("/home");
      }
    } catch (error) {
      Modal.error({ content: error.response.data });
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      setUser(null);
      Modal.confirm({ content: "Voulez vous deconnecter ?" });
      location.assign("/login");
    } catch (error) {
      Modal.error({ content: "failed de logout" });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
