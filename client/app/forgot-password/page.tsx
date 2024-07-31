"use client"

import React, { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log(process.env.NEXT_PUBLIC_API_URL)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      )
      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        router.push("/reset-password?auth-validation-token=" + data.token)
        setLoading(false)
      } else {
        toast.error(data.message || "Failed to send reset password email")
        setErrorMsg(data.message || "Failed to send reset password email")
        console.error("Failed to send reset password email")
        setLoading(false)
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      setErrorMsg("An error occurred. Please try again.")
      console.error("An error occurred:", error)
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="w-full py-2 px-4 text-white bg-[#A435F0] rounded-lg hover:bg-[#842dc2]"
              disabled={loading}
            >
              {loading ? "Loading..." : "Send Reset Request"}
            </Button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4">
          <a href="/login" className="text-sm text-[#A435F0] hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
