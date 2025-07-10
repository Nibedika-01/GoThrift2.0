import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if(!token){
        setLoading(false);
        return;
      }

      try{
        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if(!response.ok){
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data.user || data);
      }catch(error){
        console.error("Fetch user Failed:"+ error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("userToken");
      }finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]); // Run only on mount, token is checked within

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }
      const { token, user } = await response.json();
      localStorage.setItem("userToken", token);
      setToken(token);
      setUser(user);
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