import { clearAuthStorage, fetchCsrfToken, signinRequest } from "@/config/api";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserType } from "../constants/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter();

    useEffect(() => {
        // checkAuth();
    }, []);

    // const checkAuth = async () => {
    //     try {
    //         const token = await getToken();

    //         if (!token) {
    //             setUser(null);
    //             router.replace("/(auth)/welcome");
    //             return;
    //         }

    //         const res = await apiRequest("/auth/me", {
    //             method: "GET",
    //             auth: true,
    //         });

    //         setUser(res.user);
    //         router.replace("/(tabs)");
    //     } catch (error) {
    //         await removeToken();
    //         setUser(null);
    //         router.replace("/(auth)/welcome");
    //     }
    // };

    const login = async (email: string, password: string) => {
        try {
            await fetchCsrfToken();
            const res = await signinRequest(email, password);

            // adjust this based on your backend response
            if (res?.user) {
                setUser(res.user);
            }

            router.replace("/(tabs)");
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                msg: error?.message || "Login failed",
            };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            await fetchCsrfToken();
            const res = await signinRequest(email, password);

            // adjust this based on your backend response
            if (res?.user) {
                setUser(res.user);
            }

            router.replace("/(tabs)");
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                msg: error?.message || "Login failed",
            };
        }
    };

    const logout = async () => {
        try {
            await clearAuthStorage();
            setUser(null);
            router.replace("/(auth)/welcome");
        } catch (error) {
            console.log("logout error:", error);
        }
    };

    const contextValue: AuthContextType = {
        user, setUser, login, register, logout
    }

    return (
        <AuthContext.Provider value={contextValue} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be wrapped inside AuthProvider");
    }

    return context;
}