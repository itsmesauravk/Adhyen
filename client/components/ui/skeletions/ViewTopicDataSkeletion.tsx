import React from "react"
import Skeleton from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

const ViewTopicDataSkeletion = () => {
  return (
    <div className="container mx-auto p-4 max-h-[500px] overflow-y-auto">
      <div className="topic-details">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex h-5 items-center space-x-4 text-sm mb-4">
          <Skeleton className="h-5 w-20" />
          <Separator orientation="vertical" />
          <Skeleton className="h-5 w-10" />
          <Separator orientation="vertical" />
          <Skeleton className="h-5 w-10" />
          <Separator orientation="vertical" />
          <Skeleton className="h-5 w-10" />
        </div>
        <Separator className="mt-5 mb-5" />

        <div className="video-section mt-5 mb-6">
          <Skeleton className="h-5 w-1/4 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
            <Skeleton className="h-10 w-full mb-2" />
          </div>
        </div>

        <div className="learning-outcomes mt-6">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <ul className="list-disc pl-5 space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ViewTopicDataSkeletion
