"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("Provider Login", {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      console.log("Login successful")
      toast.success("Login successful!")
      router.push("/provider/dashboard")
    } else {
      console.error("Login failed:", result?.error)
      toast.error("Invalid credentials!")
    }
  }

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault()

  //   // Perform login logic here
  //   if (email === "admin@example.com" && password === "password") {
  //     toast.success("Login successful!")
  //   } else {
  //     toast.error("Invalid credentials!")
  //   }
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="flex flex-wrap justify-around items-center rounded-lg w-full max-w-[1200px] p-5 bg-white">
        {/* Left Section - Form */}
        <div className="w-full max-w-lg  lg:mb-0 lg:mr-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Welcome Back!
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0] mt-1 w-full"
                required
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0] mt-1 w-full"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <a
                href="/provider/forgot-password"
                className="text-sm text-[#A435F0] hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#A435F0] hover:bg-[#842dc2] text-white py-2 rounded-lg text-lg font-semibold"
            >
              Login
            </Button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/provider/register"
              className="text-[#A435F0] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="hidden lg:flex justify-center items-center">
          <Image
            src="/images/provider-login.png"
            alt="Login"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
