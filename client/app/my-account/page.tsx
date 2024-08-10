"use client"

import React, { use, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProfileNavbar from "../components/profile/ProfileNavbar"
import ContinueLearning from "../components/profile/ContinueLearning"
import RecentlyViewed from "../components/profile/RecentlyViewed"
import Skeleton from "@/components/ui/skeleton"
const Page = () => {
  const [loading, setLoading] = useState(true)

  const currentHour = new Date().getHours()

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening"

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <div>
      <ProfileNavbar />
      <div className="container mx-auto px-4 lg:px-40">
        {loading ? (
          <div className="container mx-auto px-4 lg:px-40">
            <div className="mt-10">
              <Skeleton className="h-8 w-1/4 rounded mb-4" />
              <Skeleton className="h-12 w-1/3 rounded" />
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-xl font-bold text-gray-900">{greeting},</p>
            <p className="text-5xl font-extrabold text-gray-900">
              Saurav Karki
            </p>
          </div>
        )}
        {/* body  */}

        {/* body  */}
        <div className="flex flex-col gap-14 mt-24">
          <ContinueLearning />
          <RecentlyViewed />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
