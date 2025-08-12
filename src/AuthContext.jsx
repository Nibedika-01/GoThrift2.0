import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(true);

  // 🧠 Load user info if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);

        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await response.json();

        setUser({
          id: userData.id || userData._id,
          email: userData.email,
          displayName: userData.displayName,
          name: userData.name,
          phoneNumber: userData.phoneNumber
        });
      } catch (error) {
        console.error("Fetch user failed:", error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("userToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // 🔐 Login Function
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const { token, user } = await response.json();

      localStorage.setItem("userToken", token);
      setToken(token);
      setUser({
        id: user.id || user._id,
        email: user.email,
        displayName: user.displayName
      });
      return user;
    } catch (error) {
      throw error.message || "Login failed";
    }
  };

  // 🆕 Register Function (No auto-login if email verification is needed)
  const register = async (email, password, phoneNumber, name) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, phoneNumber, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration Failed");
      }

      const data = await response.json();
      return data.user; // no login here — waiting for email verification
    } catch (error) {
      throw error.message || "Registration Failed";
    }
  };

  // ✉️ Resend Verification Email
  const resendVerification = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to resend");

      return data.message;
    } catch (error) {
      throw error.message || "Error resending verification email";
    }
  };

  // 🚪 Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        register,
        resendVerification,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
