import React, { useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { MdDelete, MdModeEditOutline } from "react-icons/md"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"

interface Course {
  id: number
  title: string
  category: string
  image: string
  price: number
  likes: number
  rating: number
  duration: string
  slug: string
  students_enrolled: number
  course_views: number
  isPaid: boolean
  providerId: number
  registered_users: number[]
}

interface ActionCardProps {
  courseDetail: Course
  providerId: number
}

const ActionCard: React.FC<ActionCardProps> = ({
  courseDetail,
  providerId,
}) => {
  const [confirmationInput, setConfirmationInput] = useState<string>("")
  const [isConfirming, setIsConfirming] = useState<boolean>(false)

  const handleDeleteCourse = () => {
    if (confirmationInput === "CONFIRM-DELETE") {
      toast.success(`${courseDetail.title} deleted.`)
      setIsConfirming(false)
    } else {
      toast.error("Confirmation input does not match.")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-96">
      <div className="relative h-48">
        <img
          src={courseDetail.image}
          alt={courseDetail.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mt-2">
          {courseDetail.title}
        </h3>
        <span className="rounded-md p-1 text-green-600">
          {courseDetail.category}
        </span>
        <div className="flex gap-1 items-center mt-2">
          <span className="text-gray-600">Price:</span>
          <span className="text-gray-800 font-semibold">
            {courseDetail.isPaid ? `$${courseDetail.price}` : "Free"}
          </span>
        </div>
        <div className="flex gap-1 items-center mt-2">
          <span className="text-gray-600">Students Enrolled:</span>
          <span className="text-gray-800 font-semibold">
            {courseDetail.registered_users.length}
          </span>
        </div>

        <div className="flex mt-4 gap-3">
          <Link
            href={`/provider/${providerId}/courses/edit?course=${courseDetail.slug}`}
          >
            <Button
              className="gap-2 bg-green-600 text-white hover:bg-green-700  hover:text-white"
              size="sm"
              variant="outline"
            >
              <MdModeEditOutline className="size-5 " />
              Edit
            </Button>
          </Link>

          <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
            <AlertDialogTrigger asChild>
              <Button className="gap-2" size="sm" variant="destructive">
                <MdDelete className="size-5" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Confirm <span className="font-bold text-red-800">DELETE</span>{" "}
                  {courseDetail.title}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Please type{" "}
                  <span className="font-bold text-red-600">CONFIRM-DELETE</span>{" "}
                  to confirm deletion.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <input
                type="text"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                className="border rounded-md p-2 w-full"
                placeholder="Type CONFIRM-DELETE to confirm"
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteCourse}
                  className="bg-red-600 hover:bg-red-800"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default ActionCard
