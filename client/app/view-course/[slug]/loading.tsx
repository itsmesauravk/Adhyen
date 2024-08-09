// src/pages/LoadingPage.tsx

import React from "react"
import Skeleton from "@/components/ui/skeleton"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

const LoadingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center">
        {/* Course Details Skeleton */}
        <div className="md:ml-8 mt-4 md:mt-0 md:flex-grow">
          {/* Breadcrumb Skeleton */}
          <div className="mb-4 space-y-1">
            <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
          </div>

          {/* Provider and Title Skeleton */}
          <div className="space-y-4">
            <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
            <div className="bg-gray-200 h-8 w-1/2 rounded"></div>
          </div>

          {/* Description Skeleton */}
          <div className="mt-4">
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded mt-2"></div>
          </div>

          {/* Instructor and Button Skeleton */}
          <div className="flex mt-4 items-center space-x-4">
            <div className="bg-gray-200 h-6 w-12 rounded"></div>
            <div className="bg-gray-200 h-6 w-24 rounded"></div>
            <div className="bg-gray-200 h-4 w-40 rounded"></div>
          </div>

          {/* Price Skeleton */}
          <div className="mt-8">
            <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
          </div>

          {/* Button Skeleton */}
          <div className="mt-6">
            <div className="bg-gray-200 h-10 w-40 rounded"></div>
          </div>

          {/* Students Joined Skeleton */}
          <div className="flex items-center mt-4 space-x-2">
            <div className="bg-gray-200 h-4 w-24 rounded"></div>
            <div className="bg-gray-200 h-4 w-40 rounded"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LoadingPage
