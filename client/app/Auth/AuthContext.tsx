"use client"
// AuthProvider.tsx
import React, { createContext, useState, ReactNode, useContext } from "react"

// Define the context type
interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Define the provider component type
interface AuthProviderProps {
  children: ReactNode
}

// AuthProvider component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  console.log("isLoggedIn", isLoggedIn)

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
