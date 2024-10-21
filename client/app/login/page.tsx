"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { AuthProvider, useAuth } from "../Auth/AuthContext"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { setIsLoggedIn, isLoggedIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // console.log("tt", isLoggedIn)
    if (!email || !password) {
      setError("Email and password are required.")
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await response.json()

      if (data.success && data.twoFAEnabled) {
        toast.success("Verification code sent to your email.")
        setTimeout(() => {
          router.push(`/twoFAverify?validate-token=${data.token}`)
        }, 500)
      } else if (data.success && !data.twoFAEnabled) {
        toast.success("Logged in successfully.")
        setIsLoggedIn(true)
        setTimeout(() => {
          router.push("/")
        }, 5000)
      } else {
        toast.error(data.message || "Login failed.")
        setError(data.message || "Login failed.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      console.error("Error logging in:", error)
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <AuthProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-4xl shadow-md">
          {/* Left Side - Sign-in Form */}
          <div className="w-full md:w-1/2 p-8 space-y-6 bg-white rounded-l-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Welcome Back!
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="justify-between items-center">
                <a
                  href="/forgot-password"
                  className="text-sm text-[#A435F0] hover:underline"
                >
                  Forgot password?
                </a>
                <Button
                  type="submit"
                  className="flex items-center w-full mt-2 py-2 px-4 text-white bg-[#A435F0] rounded-lg hover:bg-[#842dc2]"
                >
                  Log In
                </Button>
              </div>
            </form>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">
                Don&apos;t have an account?
              </span>
              <Link
                href="/register"
                className="text-sm text-[#A435F0] hover:underline"
              >
                Sign Up
              </Link>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button variant="login">
                <img
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
                  alt="Google logo"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1510172951991-856a654063f9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Login Image"
              className="object-cover w-full h-full rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default LoginPage
