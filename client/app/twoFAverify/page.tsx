"use client"

import React, { FormEvent, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const TwoFactorAuthPage = () => {
  const getToken = useSearchParams()
  const token = getToken.get("validate-token")

  const router = useRouter()

  const [otp, setOtp] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  //for validation of OTP and login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/twofa-validation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, otp }),
        }
      )
      const data = await response.json()
      if (data.success) {
        console.log(data.message)
        toast.success(data.message || "User verified Successful.")
        router.push("/")
        setLoading(false)
      } else {
        toast.error(data.message || "OTP validation failed.")
        setErrorMsg(data.message || "OTP validation failed.")
        setLoading(false)
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      setErrorMsg("An error occurred. Please try again.")
      console.error("Error verifying OTP:", error)
      setLoading(false)
    }
  }

  if (!token) {
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-md">
        {/* Left Side - 2FA Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6 bg-white rounded-l-lg">
          <h2 className="text-2xl font-bold text-center text-[#A435F0]">
            Adhyen
          </h2>

          <h2 className="text-2xl font-bold text-center text-gray-800">
            Two-Factor Authentication
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Enter OTP Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="6-digit OTP Code"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="justify-between items-center">
              <Button
                type="submit"
                className="flex items-center w-full mt-2 py-2 px-4 text-white bg-[#A435F0] rounded-lg hover:bg-[#842dc2]"
                onClick={handleSubmit}
                {...(loading && { disabled: true })}
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-4"></div>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="text-sm text-gray-600">
              Didn&apos;t receive an OTP?
            </span>
            <Link
              href="/resend-otp"
              className="text-sm text-[#A435F0] hover:underline"
            >
              Resend
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/image.png"
            alt="2FA Image"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default TwoFactorAuthPage
