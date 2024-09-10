"use client"

import React, { useState, useEffect, ChangeEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"

const Page = () => {
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setIsResendDisabled(false)
    }

    return () => clearInterval(timer)
  }, [countdown])

  const handleResendClick = () => {
    setIsResendDisabled(true)
    setCountdown(120)
  }

  const handleVerifyClick = () => {
    console.log("Entered OTP:", otp.join(""))
  }

  const handleOtpChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp]
    newOtp[index] = event.target.value
    setOtp(newOtp)

    // Move focus to the next input
    if (event.target.value && index < otp.length - 1) {
      const nextInput = document.querySelectorAll("input")[
        index + 1
      ] as HTMLInputElement
      nextInput?.focus()
    }
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelectorAll("input")[
        index - 1
      ] as HTMLInputElement
      prevInput?.focus()
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-lg flex flex-col lg:flex-row items-center">
        {/* Left Section */}
        <div className="flex-1 max-w-md p-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Verify Your Email
          </h1>
          <p className="text-gray-700 mb-4 text-center">
            Enter the 6-digit code we sent to{" "}
            <span className="font-semibold">your email</span>.
          </p>
          <p className="text-sm text-gray-500 mb-6 text-center">
            OTP will expire in 10 minutes.
          </p>

          <div className="flex gap-2 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border rounded outline-none focus:outline-none focus:border-main"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-6 items-center">
            {isResendDisabled ? (
              <p className="text-sm text-gray-500 mb-4">
                Resend available in {Math.floor(countdown / 60)}:
                {("0" + (countdown % 60)).slice(-2)}
              </p>
            ) : (
              <p
                onClick={handleResendClick}
                className="underline text-main hover:cursor-pointer transition"
              >
                Resend OTP
              </p>
            )}
            <button
              onClick={handleVerifyClick}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Verify
            </button>
            <Link
              href="/provider/login"
              className="text-main hover:cursor-pointer underline"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-1 justify-center">
          <Image
            src="/images/otp-password.png"
            alt="Verify Email"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Page
