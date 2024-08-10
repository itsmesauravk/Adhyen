"use client"

import React, { useEffect, useState } from "react"
import MyWishCourse from "@/data/courses.json"
import ProfileNavbar from "@/app/components/profile/ProfileNavbar"
import Footer from "@/app/components/Footer"
import Link from "next/link"
import Image from "next/image"

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
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    setCourses(MyWishCourse.slice(0, 0))
  }, [])

  return (
    <div>
      <ProfileNavbar />
      <div className="container mx-auto px-4 lg:px-40 py-10">
        <h1 className="flex items-center text-2xl font-bold mb-4">
          <span>
            <Image
              src="/gifs/wishlist.gif"
              alt="wishlist"
              width={50}
              height={50}
            />
          </span>
          Wishlist
        </h1>
        <div className="flex flex-col gap-2">
          {courses.length === 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-gray-600">No courses in your wishlist</p>
              <Image
                src="/gifs/butterflies.gif"
                alt="wishlist"
                width={200}
                height={200}
              />
            </div>
          )}
          {courses.length > 0 &&
            courses.map((course) => (
              <Link key={course.id} href={`/view-course/${course.slug}`}>
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
                        {course.duration} • {course.students_enrolled} students
                      </p>
                      <p className="text-sm text-gray-500">
                        {course.rating} ⭐ • {course.likes} likes
                      </p>
                      <div className="mt-2">
                        {course.isPaid ? (
                          <button className="px-3 py-1 text-sm font-semibold text-white bg-main rounded">
                            Rs {course.price}
                          </button>
                        ) : (
                          <button className="px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded">
                            Free
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
