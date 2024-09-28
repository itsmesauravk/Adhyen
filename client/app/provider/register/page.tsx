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

  // Normal Account State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [idDocument, setIdDocument] = useState<File | null>(null)

  // Organization Account State
  const [orgName, setOrgName] = useState("")
  const [orgEmail, setOrgEmail] = useState("")
  const [orgAddress, setOrgAddress] = useState("")
  const [orgContact, setOrgContact] = useState("")
  const [orgIdDocument, setOrgIdDocument] = useState<File | null>(null)

  console.log(idDocument)

  const handleSubmission = async (accountType: string) => {
    setIsSubmitting(true)

    let formData = new FormData()

    if (accountType === "normal") {
      console.log({
        accountType,
        name,
        email,
        address,
        contact,
        idDocument,
      })

      formData.append("name", name)
      formData.append("email", email)
      formData.append("address", address)
      formData.append("contact", contact)
      formData.append("providerType", accountType)
      if (idDocument) formData.append("image", idDocument)
    } else if (accountType === "organization") {
      console.log({
        accountType,
        orgName,
        orgEmail,
        orgAddress,
        orgContact,
        orgIdDocument,
      })

      formData.append("name", orgName)
      formData.append("email", orgEmail)
      formData.append("address", orgAddress)
      formData.append("contact", orgContact)
      formData.append("providerType", accountType)
      if (orgIdDocument) formData.append("image", orgIdDocument)
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/provider/register-provider`,
        {
          method: "POST",

          body: formData,
        }
      )
      const data = await response.json()

      if (data.success) {
        setIsSubmitting(false)
        toast.success(data.message)
      } else {
        setIsSubmitting(false)
        toast.error(data.message)
      }
    } catch (error) {
      setIsSubmitting(false)
      toast.error("Failed to send request")
      console.error(error)
    }
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id" className="text-gray-700">
                      ID Document
                    </Label>
                    <span className="text-gray-500 italic block">
                      Upload your citizenship front and back (.jpg, max size:
                      5MB)
                    </span>
                    <Input
                      id="id"
                      type="file"
                      accept=".jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setIdDocument(e.target.files[0])
                        }
                      }}
                    />
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
                    onClick={() => handleSubmission("normal")}
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
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
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
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
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
                      value={orgAddress}
                      onChange={(e) => setOrgAddress(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-contact" className="text-gray-700">
                      Organization Contact
                    </Label>
                    <Input
                      id="org-contact"
                      type="text"
                      placeholder="1234567890"
                      className="border-gray-300 focus:border-[#A435F0] focus:ring-[#A435F0]"
                      required
                      value={orgContact}
                      onChange={(e) => setOrgContact(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-id" className="text-gray-700">
                      Organization Registration Certificate
                    </Label>
                    <span className="text-gray-500 italic block">
                      Upload your organization certificate (.jpg, max size: 5MB)
                    </span>
                    <Input
                      id="org-id"
                      type="file"
                      accept=".jpg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setOrgIdDocument(e.target.files[0])
                        }
                      }}
                    />
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
                    onClick={() => handleSubmission("organization")}
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
            priority={false}
          />
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
