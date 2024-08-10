"use client"

import React, { useEffect, useState } from "react"
import category from "@/data/category.json"
import courses from "@/data/courses.json"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Transition from "../components/Transition"

import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import CategorySkeleton from "@/components/ui/skeletions/CategorySkeleton"

interface CourseList {
  id: number
}

interface Category {
  id: number
  category: string
  slug: string
  image: string
  description: string
  courses: CourseList[]
}

interface Course {
  category: string
  topics: { id: number; name: string; description: string }[]
  registered_users: number[]
}

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [courseList, setCourseList] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCategories(category)
  }, [])

  useEffect(() => {
    setCourseList(courses)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  })

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-10 lg:px-40 py-10">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        {loading ? (
          <CategorySkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              // Calculate total topics and registered users for the current category
              const totalTopics = courseList
                .filter((course) => course.category === cat.category)
                .reduce((acc, course) => acc + course.topics.length, 0)

              const totalRegisteredUsers = courseList
                .filter((course) => course.category === cat.category)
                .reduce(
                  (acc, course) => acc + course.registered_users.length,
                  0
                )

              return (
                <Transition key={cat.id}>
                  <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
                    <img
                      src={cat.image}
                      alt={cat.category}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold mb-2">
                        {cat.category}
                      </h2>
                      {/* <p className="text-gray-600 mb-4">{cat.description}</p> */}
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
                            {cat.courses.length}
                          </span>{" "}
                          Course
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
                            <path
                              fill-rule="evenodd"
                              d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span className="font-bold">{totalTopics}</span>{" "}
                          Topics
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
                            {totalRegisteredUsers}
                          </span>{" "}
                          Students
                        </p>
                      </div>
                      <Link href={`/category/${cat.slug}`}>
                        <Button variant="main" className="w-full">
                          Explore
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Transition>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Page
