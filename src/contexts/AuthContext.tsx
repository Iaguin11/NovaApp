
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
const USER_STORAGE_KEY = "user"
const USERS_STORAGE_KEY = "registered_users"

interface StoredUser extends User {
  password: string
}

const getRegisteredUsers = (): StoredUser[] => {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
  if(!storedUsers) return []
  try {
    return JSON.parse(storedUsers)
  } catch (error) {
    console.error("Error parsing registered users", error)
    return []
  }
}
const saveRegisteredUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const registeredUsers = getRegisteredUsers()

      const foundUser = registeredUsers.find(
        user => user.email === email && user.password === password
      )
      if(!foundUser){
        throw new Error("Credenciais inválidas. Email ou senha incorretos.")
      }

      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      }

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))

    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error instanceof Error? error.message :"Falha ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const registeredUsers = getRegisteredUsers()

      if(registeredUsers.some(user => user.email === email)){
        throw new Error("Este email já está cadastrado.")
      }

      const newUser: StoredUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      }
      
      registeredUsers.push(newUser)
      saveRegisteredUsers(registeredUsers)
      
      const userData: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error(error instanceof Error ? error.message : "Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
