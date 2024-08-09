"use client"

import React, { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import topicDetails from "@/data/topics.json"
import courseDetail from "@/data/courses.json"

import { Checkbox } from "@/components/ui/checkbox"
import ViewTopicData from "./ViewTopicData"
import AboutCourse from "./AboutCourse"

interface Topic {
  id: number
  name: string
  slug: string
  description: string
  course_id: number
  video_links: string[]
  likes: number
  reviews: number
  topic_views: number
  instructor: string
  learning_outcomes: string[]
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
}

interface LeanTopicSidebarProps {
  courseId: number
}

const LeanTopicSidebar: React.FC<LeanTopicSidebarProps> = ({ courseId }) => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [course, setCourse] = useState<Course | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const renderDiv = () => {
    switch (selected) {
      case "ViewTopicData": {
        return <ViewTopicData />
      }
      case "AboutCourse": {
        return <AboutCourse />
      }
      default: {
        return <div>Nothing to show</div>
      }
    }
  }

  useEffect(() => {
    const filteredTopics = topicDetails.filter(
      (topic) => topic.course_id === courseId
    )
    setTopics(filteredTopics || [])
  }, [courseId])

  useEffect(() => {
    const oneCourse = courseDetail.find((course) => course.id === courseId)
    setCourse(oneCourse || null)
  }, [courseId])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Course Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {course?.title || "Course Title"}
        </h1>
      </div>

      {/* Course Contents - List of Topics */}
      <div className="mb-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-2">Topics</AccordionTrigger>
            <AccordionContent className="p-4">
              <ul className="space-y-2">
                {topics.map((topic) => (
                  <li
                    key={topic.id}
                    className="flex items-center gap-2 text-gray-600 hover:underline cursor-pointer"
                  >
                    <Checkbox checked={false} disabled={true} className="" />
                    {topic.name}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Course Join and End Date */}
      <div className="mb-6">
        <div className="flex gap-1 items-center font-semibold text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-main"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Started on:</span>
        </div>
        <span className="text-gray-600">2021-09-01</span>

        <div className="flex gap-1 items-center font-semibold text-gray-600 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-main"
          >
            <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
            <path
              fillRule="evenodd"
              d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Predicted End Date:</span>
        </div>
        <span className="text-gray-600">2021-09-30</span>
      </div>

      <hr className="my-4 border-t-1 border-gray-300" />

      {/* Course Progress */}
      <div className="mb-6">
        <p className="font-semibold text-gray-800">Course Progress:</p>
        <Progress value={10} className="bg-purple-200" />
      </div>

      <hr className="my-4 border-t-1 border-gray-300" />

      {/* Course Info */}
      <div>
        <p className="font-semibold text-gray-800 hover:underline cursor-pointer">
          More About Course
        </p>
      </div>

      <hr className="my-4 border-t-1 border-gray-300" />
    </div>
  )
}

export default LeanTopicSidebar
