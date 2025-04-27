import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import api, { setAuthHeader } from "../services/api";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate(); // Use useNavigate hook here

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
      fetchUserData();
    }
  }, [token]);

  // Fetch the user data after login
  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  // Register a user
  const register = async (email, password, role) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        role,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setAuthHeader(response.data.token);
      navigate("/"); // Use navigate instead of history.push
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  // Login a user
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setAuthHeader(response.data.token);
      navigate("/"); // Use navigate instead of history.push
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAuthHeader(null);
    setUser(null);
    navigate("/login"); // Use navigate instead of history.push
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
