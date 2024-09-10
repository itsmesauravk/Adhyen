"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import Image from "next/image"

const ChangePasswordPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!")
      setConfirmPasswordError("Passwords do not match!")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Password changed successfully!")
      setPassword("")
      setConfirmPassword("")
      setPasswordError("")
      setConfirmPasswordError("")
    }, 1500)
  }

  const handlePasswordBlur = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long")
    } else {
      setPasswordError("")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="w-full max-w-6xl bg-white p-10 rounded-lg shadow-lg flex flex-col gap-5 lg:flex-row items-center">
        {/* Left Section - Form */}
        <div className="w-full lg:w-[60%]">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
            Change Your Password
          </h1>

          <div className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-700">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                required
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            {/* Change Password Button */}
            <Button
              className="w-full bg-[#A435F0] hover:bg-[#842dc2] text-white mt-4"
              onClick={handlePasswordChange}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden lg:flex justify-center lg:w-[40%] mt-8 lg:mt-0">
          <Image
            src="/images/password-change.png"
            alt="Change Password Illustration"
            width={400}
            height={400}
            priority={false}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage
