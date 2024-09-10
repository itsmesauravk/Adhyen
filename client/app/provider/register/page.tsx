"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaUser, FaBuilding } from "react-icons/fa"
import toast from "react-hot-toast"
import styles from "./tabs.module.css"
import Image from "next/image"
import Link from "next/link"

const RegistrationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmission = async (accountType: string) => {
    setIsSubmitting(true)

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(`${accountType} Request Has Been Submitted!`)
    }, 1500)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="flex flex-wrap justify-center items-center rounded-lg w-full max-w-[1200px] p-2 bg-white shadow-lg">
        {/* Left Section - Form */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center lg:text-left">
            Register As
          </h1>

          <Tabs defaultValue="normal-account" className="w-full mx-auto">
            {/* Tab Header */}
            <TabsList className="grid grid-cols-2 mb-6 rounded-lg overflow-hidden shadow">
              <TabsTrigger value="normal-account" className={styles.tabTrigger}>
                <FaUser className="inline mr-2" /> Normal Account
              </TabsTrigger>
              <TabsTrigger
                value="organization-account"
                className={styles.tabTrigger}
              >
                <FaBuilding className="inline mr-2" /> Organization Account
              </TabsTrigger>
            </TabsList>

            {/* Normal Account */}
            <TabsContent
              value="normal-account"
              className={`${styles.tabContent}`}
            >
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Normal Account
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    For freelancers, students, or individuals looking to upload
                    study materials.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Input Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Firstname Lastname"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700">
                      Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="123 Street, City"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-gray-700">
                      Contact
                    </Label>
                    <Input
                      id="contact"
                      type="text"
                      placeholder="1234567890"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id" className="text-gray-700">
                      ID Document
                    </Label>
                    <span className="text-gray-500 italic block">
                      Upload your citizenship front and back (.pdf, max size:
                      5MB)
                    </span>
                    <Input id="id" type="file" accept=".pdf" />
                  </div>
                </CardContent>

                <CardContent className="space-y-4 text-gray-600">
                  <p>
                    Once you send the request, your details will be reviewed,
                    and a response email will be sent to your provided email
                    within 2-6 working days.
                  </p>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full bg-[#A435F0] hover:bg-[#842dc2] text-white"
                    onClick={() => handleSubmission("Normal Account")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Request"}
                  </Button>
                </CardFooter>
                <CardContent>
                  <p className="text-center text-gray-500 mt-1">
                    Already have an account?{" "}
                    <Link
                      href="/provider/login"
                      className="text-[#A435F0] hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organization Account */}
            <TabsContent
              value="organization-account"
              className={`${styles.tabContent}`}
            >
              <Card className="shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Organization Account
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    For companies or organizations looking to upload study
                    materials.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Input Fields */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="organization-name"
                      className="text-gray-700"
                    >
                      Organization Name
                    </Label>
                    <Input
                      id="organization-name"
                      type="text"
                      placeholder="Organization Name"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-email" className="text-gray-700">
                      Organization Email
                    </Label>
                    <Input
                      id="org-email"
                      type="email"
                      placeholder="organization@example.com"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-address" className="text-gray-700">
                      Organization Address
                    </Label>
                    <Input
                      id="org-address"
                      type="text"
                      placeholder="456 Organization St, City"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-gray-700">
                      Organization Contact
                    </Label>
                    <Input
                      id="contact"
                      type="text"
                      placeholder="1234567890"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-id" className="text-gray-700">
                      Organization Registration Certificate
                    </Label>
                    <span className="text-gray-500 italic block">
                      Upload your organization certificate (.pdf, max size: 5MB)
                    </span>
                    <Input id="org-id" type="file" accept=".pdf" />
                  </div>
                </CardContent>

                <CardContent className="space-y-4 text-gray-600">
                  <p>
                    Once you send the request, your details will be reviewed,
                    and a response email will be sent to your provided email
                    within 2-6 working days.
                  </p>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full bg-[#A435F0] hover:bg-[#842dc2] text-white"
                    onClick={() => handleSubmission("Organization Account")}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Request"}
                  </Button>
                </CardFooter>
                <CardContent>
                  <p className="text-center text-gray-500 mt-1">
                    Already have an account?{" "}
                    <Link
                      href="/provider/login"
                      className="text-[#A435F0] hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Section - Image */}
        <div className="hidden lg:flex w-full lg:w-[45%]  justify-center ">
          <Image
            src="/images/provider-register.png"
            alt="Register Illustration"
            width={500}
            height={500}
            priority={false} // Lazy loading for better performance
          />
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
