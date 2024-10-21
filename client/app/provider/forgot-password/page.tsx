"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"

const Page: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("")

  const handleSendOtp = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address!")
      return
    }

    toast.success("OTP sent to your email!")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-lg flex flex-col lg:flex-row items-center">
        {/* Left Side - Forgot Password Form */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
            Forgot Password
          </h1>

          <p className="text-gray-600 mb-4 text-center lg:text-left">
            Enter your email address to receive an OTP to reset your password.
          </p>

          <form onSubmit={handleSendOtp} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                required
              />
            </div>

            {/* Send OTP Button */}
            <Button
              type="submit"
              className="w-full bg-[#A435F0] hover:bg-[#842dc2] text-white py-2 rounded-lg"
            >
              Send OTP
            </Button>
          </form>
          <Link
            className="text-sm text-[#A435F0] underline mt-4"
            href={"/provider/login"}
          >
            Back to Login
          </Link>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex justify-center lg:w-[40%] mt-8 lg:mt-0">
          <Image
            src="/images/forgot-password.png"
            alt="Forgot Password Illustration"
            width={500}
            height={500}
            priority={false} // Lazy loading for better performance
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Page
