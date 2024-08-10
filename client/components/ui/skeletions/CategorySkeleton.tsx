"use client"

import React from "react"
import Skeleton from "../skeleton"

const CategorySkeleton = () => {
  return (
    <div className="container mx-auto px-4 mt-10 lg:px-40 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
          >
            <div className="w-full h-40 bg-gray-200 animate-pulse"></div>
            <div className="p-4 flex flex-col flex-grow">
              <Skeleton className="w-1/2 h-6 mb-2" />
              <Skeleton className="w-full h-4 mb-4" />
              <div className="flex justify-center items-center mb-4">
                <div className="flex gap-1 item-center text-gray-600 mr-4">
                  <Skeleton className="w-6 h-6 bg-gray-200" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="h-6 mx-2">
                  <Skeleton className="w-px h-full bg-gray-300" />
                </div>
                <div className="flex gap-1 items-center text-gray-600 mr-4">
                  <Skeleton className="w-6 h-6 bg-gray-200" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <div className="h-6 mx-2">
                  <Skeleton className="w-px h-full bg-gray-300" />
                </div>
                <div className="flex gap-1 items-center text-gray-600">
                  <Skeleton className="w-6 h-6 bg-gray-200" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
              <Skeleton className="w-full h-12 bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySkeleton
