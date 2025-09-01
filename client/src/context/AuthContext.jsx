import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleAuthModal, setVisibleAuthModal] = useState(false)
    const [visibleDetailInfoModal, setvisibleDetailInfoModal] = useState(false);
    const [detailInfo, setDetailInfo] = useState(null)


    const checkLoggedInUser = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                };
                const response = await api.get("/user/user/", config)
                setLoggedIn(true)
                setUser(response.data.company)
                
            }
            else {
                setLoggedIn(false);
                setUser("");
            }
        }
        catch (error) {
            setLoggedIn(false);
            setUser("");
        }
    };

    useEffect(() => {
        checkLoggedInUser();
    }, [])


    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                };
                await api.post("/user/logout/", { "refresh": refreshToken }, config)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setLoggedIn(false);
                setUser("");
                console.log("Log out successful!")
            }
        }
        catch (error) {
            console.error("Failed to logout", error.response?.data || error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ checkLoggedInUser, handleLogout, user,
                                       setUser, isLoggedIn, setLoggedIn, visibleAuthModal,
                                       setVisibleAuthModal, visibleDetailInfoModal, setvisibleDetailInfoModal,
                                       detailInfo, setDetailInfo, isLoading, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);