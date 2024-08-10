"use client"

import Footer from "@/app/components/Footer"
import Navbar from "@/app/components/Navbar"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import category from "@/data/category.json"
import coursesData from "@/data/courses.json"

import { Separator } from "@radix-ui/react-separator"
import { Button } from "@/components/ui/button"

import Transition from "@/app/components/Transition"
import Link from "next/link"

interface Category {
  id: number
  category: string
  slug: string
  image: string
  description: string
  courses: { id: Number; title: String }[]
}

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
  registered_users: number[]
}

const Page = () => {
  const { category: categorySlug } = useParams()
  const [categoryName, setCategoryName] = useState<Category | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const selectedCategory = category.find((cat) => cat.slug === categorySlug)
    setCategoryName(selectedCategory || null)
  }, [categorySlug])

  useEffect(() => {
    if (categoryName) {
      const filteredCourses = coursesData.filter(
        (c) => c.category === categoryName.category
      )
      setCourses(filteredCourses)
      setLoading(false)
    }
  }, [categoryName])

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-10 lg:px-40 py-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex">
              <img
                src={categoryName?.image}
                alt={categoryName?.category}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  {categoryName?.category}
                </h1>
                <p>{categoryName?.courses.length} Courses</p>
              </div>
            </div>
            <div>{categoryName?.description}</div>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Transition key={course.id}>
                    <div key={course.id} className="border rounded-lg p-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 object-cover mb-4"
                      />
                      <h2 className="text-xl font-semibold">{course.title}</h2>
                      <div className="flex justify-center items-center mb-4">
                        <p className="flex gap-1 item-center text-gray-600 mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 text-main"
                          >
                            <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                          </svg>
                          <span className="font-bold">
                            {course.topics.length}
                          </span>{" "}
                          Topics
                        </p>
                        <Separator
                          orientation="vertical"
                          className="h-6 mx-2"
                        />
                        <p className="flex gap-1 items-center  text-gray-600 mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 text-main"
                          >
                            <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                            <path
                              fill-rule="evenodd"
                              d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span className="font-bold">{course.duration}</span>{" "}
                        </p>
                        <Separator
                          orientation="vertical"
                          className="h-6 mx-2"
                        />
                        <p className="flex gap-1 items-center text-gray-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 text-main"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                              clip-rule="evenodd"
                            />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                          </svg>
                          <span className="font-bold">
                            {course.registered_users.length}
                          </span>{" "}
                          Students
                        </p>
                      </div>
                      <div className="w-full">
                        <Link href={`/view-course/${course.slug}`}>
                          <Button variant={"main"}>View Course</Button>
                        </Link>
                      </div>
                    </div>
                  </Transition>
                ))}
              </div>
            ) : (
              <p>No courses found in this category.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Page
