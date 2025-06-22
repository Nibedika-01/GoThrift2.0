import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const[token, setToken] = useState(localStorage.getItem('userToken'));

    const login = (newToken, userId) => {
        setToken(newToken);
        setUser({userId});
        localStorage.setItem('userToken', newToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;