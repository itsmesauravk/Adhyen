import React, { useEffect, useState } from "react"
import coursesData from "../../data/courses.json"
import Transition from "./Transition"
import page from "../view-course/[slug]/page"
import { useRouter } from "next/navigation"

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

const PopularCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])

  const router = useRouter()

  const viewCourseHandlear = (id: number) => {
    try {
      const course = courses.find((course) => course.id === id)
    if (!course) {
        throw new Error("Course not found")
      }
      // Redirect to the course page
      router.push(`/view-course/${course.slug}`)
    } catch (error) {
      console.log("Error while viewing course : ", error)
    }
  }

  useEffect(() => {
    // Fetch courses data from JSON file (or an API if needed)
    setCourses(coursesData as Course[])
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Popular Courses
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore a wide range of popular courses from top instructors around
          the world.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Transition key={course.id}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="flex gap-1 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-main"
                    >
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fill-rule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    {course.duration}
                  </span>
                  <span className="flex gap-1 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-main"
                    >
                      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                    {course.likes}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mt-2">
                  {course.title}
                </h3>
                <span className=" rounded-md p-1 text-green-600">
                  {course.category}
                </span>
                <div className="flex gap-1 items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-main"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{course.rating}</span>
                </div>

                <div className="mt-4 border-t pt-4 flex justify-between items-center">
                  <span className="text-gray-700 font-bold">
                    {course.isPaid ? (
                      `Rs ${course.price}`
                    ) : (
                      <span className="text-green-600">Free</span>
                    )}
                  </span>
                  <button
                    className="bg-[#A435F0] text-white px-4 py-2 rounded hover:bg-[#842dc2]"
                    onClick={() => viewCourseHandlear(course.id)}
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        ))}
      </div>
    </div>
  )
}

export default PopularCourses
