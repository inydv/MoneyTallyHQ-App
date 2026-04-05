import { checkAuthRequest, clearAuthStorage, fetchCsrfToken, signinRequest } from "@/config/api";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserType } from "../constants/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            if (user) {
                router.replace("/(tabs)");
            } else {
                const res = await checkAuthRequest();

                if (res) {
                    setUser(res);
                    router.replace("/(tabs)");
                } else {
                    router.replace("/(auth)/welcome");
                }
            }
        } catch (error: any) {
            return {
                success: false,
                msg: error?.message || "Check auth failed",
            };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await fetchCsrfToken();
            const res = await signinRequest(email, password);

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