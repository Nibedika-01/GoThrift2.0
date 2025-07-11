import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'; // Add this import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(true);


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
          id: userData.id || userData._id, // Handle both id and _id
          email: userData.email,
          displayName: userData.displayName
        });
      } catch (error) {
        console.error("Fetch user failed:", error, error.stack);
        setUser(null);
        setToken(null);
        localStorage.removeItem("userToken");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

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
        id: user.id || user._id, // Handle both id and _id
        email: user.email,
        displayName: user.displayName
      });
      return user;
    } catch (error) {
      throw error.message || "Login failed";
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;