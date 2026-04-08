import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await api
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.response?.data));
      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data.user);
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, fetchUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
