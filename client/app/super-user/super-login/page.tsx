"use client"
import Logo from "@/app/components/Logo"
import { sign } from "crypto"
import React, { useState } from "react"
import { signIn } from "next-auth/react"

const SuperLoginPage = () => {
  // State for email and password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (result) {
      console.log(result)
      console.log("success")
      alert("Login successful")
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - 40% on large/medium, 100% on small/mobile */}
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center bg-white p-8">
        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md space-y-4">
          {/* Login title */}
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primaryDark"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primaryDark"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-primaryDark hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full text-white bg-main font-bold shadow-md py-2 rounded-md hover:bg-mainhover transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Right side - 60% on large/medium, hidden on small/mobile */}
      <div className="lg:w-3/5 w-full lg:block hidden relative">
        {/* Background Image */}
        <img
          src="/images/superloginbg.jpg"
          alt="Login Background"
          className="w-full h-full object-cover"
        />

        {/* Darker Overlay with Welcome Text */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Welcome to Adhyen Super Login
          </h2>
          <p className="text-lg text-center max-w-lg">
            This is the main super user of Adhyen learning platform, designed to
            manage all the user access and data.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SuperLoginPage
