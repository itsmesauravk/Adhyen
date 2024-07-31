"use client"

import React, { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

const PasswordResetPage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes = 300 seconds

  const router = useRouter()
  const getToken = useSearchParams()
  const validateToken = getToken.get("auth-validation-token")

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")

      return
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, validateToken, newPassword }),
      }
    )

    const data = await response.json()
    if (data.success) {
      toast.success(data.message)

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } else {
      toast.error(data.message)
      setError(data.message)
      setSuccess("")
    }
  }

  if (!validateToken) {
    router.push("/forgot-password")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-md">
        <div className="w-full p-8 space-y-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Reset Password
          </h2>
          {timeLeft > 0 ? (
            <div className="text-center text-gray-600">
              <p>Your code will expire in: {formatTime(timeLeft)}</p>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Your code has expired</p>
            </div>
          )}
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-700"
              >
                Otp Code
              </label>
              <Input
                id="token"
                type="text"
                placeholder="6 digit code sent to email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <Button
              type="submit"
              className="flex items-center w-full mt-2 py-2 px-4 text-white bg-[#A435F0] rounded-lg hover:bg-[#842dc2]"
              disabled={timeLeft <= 0}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordResetPage
