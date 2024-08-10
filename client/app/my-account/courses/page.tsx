"use client"

import ProfileNavbar from "@/app/components/profile/ProfileNavbar"
import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import learningCourses from "@/data/courses.json"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import Footer from "@/app/components/Footer"

interface Course {
  id: number
  title: string
  category: string
  image: string
  price: number
  likes: number
  rating: number
  instructor: string
  description: string
  duration: string
  slug: string
  students_enrolled: number
  course_views: number
  course_level: string
  provider: string
  topics: { id: number; name: string; description: string }[]
  learning_outcomes: string[]
  isPaid: boolean
}

const Page = () => {
  const [paidCourses, setPaidCourses] = useState<Course[]>([])
  const [freeCourses, setFreeCourses] = useState<Course[]>([])

  useEffect(() => {
    const paid = learningCourses.filter((course) => course.isPaid).slice(0, 1)
    const free = learningCourses.filter((course) => !course.isPaid).slice(0, 2)
    setPaidCourses(paid)
    setFreeCourses(free)
  }, [])

  return (
    <div>
      <ProfileNavbar />
      <div className="container mx-auto px-4 lg:px-40 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Enrolled Courses
        </h1>
        <Tabs defaultValue="paid-courses" className="w-full">
          <TabsList>
            <TabsTrigger
              value="paid-courses"
              className="focus:ring-2 focus:ring-primary"
            >
              Paid Courses
            </TabsTrigger>
            <TabsTrigger
              value="free-courses"
              className="focus:ring-2 focus:ring-primary"
            >
              Free Courses
            </TabsTrigger>
          </TabsList>
          <TabsContent value="paid-courses" className="mt-6">
            <div className="flex flex-col space-y-6">
              {paidCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/view-course/${course.slug}/learn-topic?cid=${course.id}&tid=${course.topics[0].id}`}
                >
                  <div className="flex bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <img
                      className="w-48 h-32 object-cover rounded-l-lg"
                      src={course.image}
                      alt={course.title}
                    />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          {course.duration} • {course.students_enrolled}{" "}
                          students
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.rating} ⭐ • {course.likes} likes
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {course.category}
                        </p>
                      </div>
                      <div>
                        <p className="mt-4 text-sm text-gray-600">
                          Progress ({10}%)
                        </p>
                        <Progress value={10} className="bg-purple-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="free-courses" className="mt-6">
            <div className="flex flex-col space-y-6">
              {freeCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/view-course/${course.slug}/learn-topic?cid=${course.id}&tid=${course.topics[0].id}`}
                >
                  <div className="flex bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <img
                      className="w-48 h-32 object-cover rounded-l-lg"
                      src={course.image}
                      alt={course.title}
                    />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                          {course.duration} • {course.students_enrolled}{" "}
                          students
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.rating} ⭐ • {course.likes} likes
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {course.category}
                        </p>
                      </div>
                      <div>
                        <p className="mt-4 text-sm text-gray-600">
                          Progress ({10}%)
                        </p>
                        <Progress value={10} className="bg-purple-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}

export default Page
