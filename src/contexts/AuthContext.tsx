import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. Define the User type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// 2. Define the Context State type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// 3. Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Create the Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount (Mock implementation)
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem("travel_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock Login Function (Replace with actual API call)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with your actual backend API call
      // const response = await api.post('/login', { email, password });
      
      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser: User = {
        id: "usr_123",
        name: "Debojyoti Das",
        email: email,
        avatar: "/placeholder-avatar.jpg"
      };

      setUser(mockUser);
      localStorage.setItem("travel_user", JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("travel_user");
    // Optional: Redirect to home or login page here
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Create a custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
