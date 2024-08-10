import React from "react"
import Skeleton from "@/components/ui/skeleton"

const LeanTopicSidebarSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Skeleton for Course Title */}
      <div className="mb-6">
        <Skeleton className="h-8 w-3/4 rounded" />
      </div>

      {/* Skeleton for Course Contents */}
      <div className="mb-6">
        <Skeleton className="h-6 w-1/3 rounded mb-2" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} className="h-5 w-full rounded" />
          ))}
        </div>
      </div>

      {/* Skeleton for Course Join and End Date */}
      <div className="mb-6">
        <Skeleton className="h-5 w-1/3 rounded mb-1" />
        <Skeleton className="h-5 w-1/2 rounded mb-4" />
        <Skeleton className="h-5 w-1/3 rounded mb-1" />
        <Skeleton className="h-5 w-1/2 rounded" />
      </div>

      <hr className="my-4 border-t-1 border-gray-300" />

      {/* Skeleton for Course Progress */}
      <div className="mb-6">
        <Skeleton className="h-5 w-1/3 rounded mb-2" />
        <Skeleton className="h-2 w-full rounded" />
      </div>

      <hr className="my-4 border-t-1 border-gray-300" />

      {/* Skeleton for More About Course */}
      <div>
        <Skeleton className="h-5 w-1/3 rounded" />
      </div>

      <hr className="my-4 border-t-1 border-gray-300" />

      {/* Skeleton for Review Section */}
      <div>
        <Skeleton className="h-5 w-1/4 rounded mb-4" />
        <Skeleton className="h-8 w-1/3 rounded mb-2" />
        <Skeleton className="h-6 w-full rounded mb-4" />
        <Skeleton className="h-6 w-full rounded" />
      </div>
    </div>
  )
}

export default LeanTopicSidebarSkeleton
