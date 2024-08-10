import React from "react"
import Skeleton from "@/components/ui/skeleton"

const ContinueLearningSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-1/3 rounded mb-4" />
      <Skeleton className="h-6 w-2/3 rounded mb-10" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <Skeleton className="w-full h-56" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 rounded mb-2" />
              <Skeleton className="h-4 w-1/2 rounded mb-4" />
              <Skeleton className="h-4 w-1/2 rounded mb-2" />
              <Skeleton className="h-2 w-full mt-3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContinueLearningSkeleton
