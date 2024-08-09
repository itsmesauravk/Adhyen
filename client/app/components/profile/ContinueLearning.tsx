"use client"

import React, { useEffect, useState } from "react"
import learningCourses from "@/data/courses.json"

import { Progress } from "@/components/ui/progress"

import Transition from "../Transition"

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
}

const ContinueLearning = () => {
  const [continueCourses, setContinueCourses] = useState<Course[]>([])

  useEffect(() => {
    // Fetch only the first 2 courses
    setContinueCourses(learningCourses.slice(0, 2))
  }, [])

  return (
    <div>
      <div className="">
        <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
        <p className="mt-1 text-lg text-gray-600 max-w-2xl ">
          Here are some courses that you have started but haven't completed yet.
        </p>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {continueCourses.map((course) => (
            <Transition key={course.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-56 object-cover object-center"
                  src={course.image}
                  alt={course.title}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{course.category}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm w-full font-semibold text-gray-600">
                      Progress: <span className="text-main">10%</span>
                      <Progress
                        value={10}
                        className="w-full mt-2 bg-purple-200"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContinueLearning
