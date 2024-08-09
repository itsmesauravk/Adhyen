"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import coursesData from "../../../data/courses.json"
import Navbar from "@/app/components/Navbar"

import LoadingPage from "./loading"

import Image from "next/image"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import Footer from "@/app/components/Footer"
import TopicSummary from "@/app/components/TopicSummary"
import Link from "next/link"

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

const ViewCoursePage = () => {
  const [courseDetails, setCourseDetails] = useState<Course | null>(null)
  const router = useRouter()
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      setTimeout(() => {
        const course = coursesData.find((course) => course.slug === slug)
        setCourseDetails(course || null)
      }, 600)
    }
  }, [slug])

  if (!courseDetails) {
    return <LoadingPage />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow flex mt-16 justify-center p-2">
        <div className="mx-auto px-4  lg:px-40 ">
          <div className="flex flex-col md:flex-row items-center">
            {/* course details  */}
            <div className="md:ml-8 mt-4 md:mt-0 md:flex-grow">
              <div className="mb-5">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/provider">Provider</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-main">
                        {courseDetails.category}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <h1 className="text-3xl mt-5 text-primary-600">
                {courseDetails.provider}
              </h1>
              <p className="text-5xl font-bold mt-10 text-secondary-600 ">
                {courseDetails.title}
              </p>
              <p className="text-gray-700 mt-4 ">{courseDetails.description}</p>
              <div className="flex mt-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-main"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className=" ml-2">{courseDetails.instructor}</span>
                <span className="ml-3 bg-purple-200 p-1 rounded-md font-bold">
                  Head Instructor
                </span>
              </div>
              <div className="mt-8">
                {courseDetails.isPaid ? (
                  <span className="text-2xl font-semibold text-primary-600">
                    Rs {courseDetails.price.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-2xl font-semibold text-green-600">
                    Free
                  </span>
                )}
              </div>

              {/* this will change and authentication will be added later  */}

              {courseDetails.isPaid ? (
                <Link href={`/checkout/${courseDetails.id}`}>
                  <button className="flex items-center gap-2 mt-6 px-6 py-3 w-40 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Enroll Now
                  </button>
                </Link>
              ) : (
                <Link
                  href={`/view-course/${courseDetails.slug}/learn-topic?cid=${courseDetails.id}&tid=${courseDetails.topics[0].id}`}
                >
                  <button className="mt-6 px-6 py-3 w-40 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    Join Now
                  </button>
                </Link>
              )}
              {/* course stats  */}

              <div className="flex items-center mt-4">
                <span className="font-bold">
                  {courseDetails.students_enrolled.toLocaleString()}
                </span>
                <span>
                  <span className="ml-2">students joined</span>
                </span>
              </div>
              {/* course extra details */}
              <div className="mt-10">
                <div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">
                      About Course
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Explore more about the course
                    </p>
                  </div>
                  <Separator className="my-8" />
                  <div className="flex h-5 items-center space-x-4 text-sm">
                    <div className=" m-10">
                      <p className="font-semibold text-2xl">
                        {courseDetails.duration}
                      </p>
                      <span className="text-muted-foreground">
                        Learn at your suitable time
                      </span>
                    </div>
                    <Separator orientation="vertical" />
                    <div className=" m-10">
                      <p className="font-semibold text-2xl">
                        {courseDetails.course_level}
                      </p>
                      <span className="text-muted-foreground">
                        Nothing is impossible
                      </span>
                    </div>
                    <Separator orientation="vertical" />
                    <div className=" m-10">
                      <p className="font-semibold text-2xl">
                        {courseDetails.rating}
                      </p>
                      <span className="text-muted-foreground">
                        Rating by students
                      </span>
                    </div>
                    <Separator orientation="vertical" />
                    <div className=" m-10">
                      <p className="font-semibold text-2xl">
                        {courseDetails.topics.length} Topics
                      </p>
                      <span className="text-muted-foreground">
                        Total number of topics covered in this course
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* learning outcomes  */}
              <div className="mt-10">
                <p className="text-xl font-semibold">
                  Why to learn this Course ?
                </p>
                <div className="mt-4">
                  <ul className="space-y-2">
                    {courseDetails.learning_outcomes.map((outcome, index) => (
                      <li key={index} className="text-lg flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6 text-main flex-shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="ml-2">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* certificate achievement  */}
              <div className="mt-10 flex items-center justify-between  p-6 bg-grey-50 rounded-lg shadow-lg">
                <div className="w-1/2">
                  <p className="text-2xl font-bold text-primary-600">
                    Certificate of Achievement
                  </p>
                  <p className="mt-4 text-lg text-gray-700">
                    Upon successful completion of this course, you will be
                    awarded a Certificate of Achievement, acknowledging your
                    dedication and hard work.
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    Showcase your certificate to demonstrate your expertise and
                    enhance your professional profile.
                  </p>
                  <button className="mt-6 px-4 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg">
                    View Sample Certificate
                  </button>
                </div>
                <div className="">
                  <Image
                    src="/images/certificate.jpg"
                    width={250}
                    height={150}
                    alt="certificate-image"
                    className="rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              </div>
              {/* topic summary  */}
              <div className="mt-10">
                <TopicSummary courseId={courseDetails.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ViewCoursePage
