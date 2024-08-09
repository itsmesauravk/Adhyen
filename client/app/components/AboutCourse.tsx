import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CourseData from "@/data/courses.json"
import TopicData from "@/data/topics.json"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  brief_description?: string
  language: string
}

interface AboutCourseProps {
  courseId: number
}

const AboutCourse: React.FC<AboutCourseProps> = ({ courseId }) => {
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    const foundCourse = CourseData.find((course) => course.id === courseId)
    setCourse(foundCourse || null)
  }, [courseId])

  if (!course) {
    return <p>Course not found.</p>
  }

  return (
    <div className=" max-h-[500px] overflow-y-auto">
      {/* Course Title & Provider */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <span className="text-gray-600">
          Provided by <strong>{course.provider}</strong>
        </span>
      </div>

      {/* Course Summary & Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About Course</h2>
        {course.brief_description && (
          <div className="mb-4">
            <p className="text-gray-700">{course.brief_description}</p>
          </div>
        )}
        <div>
          <p className="text-gray-700">{course.description}</p>
        </div>
      </div>

      {/* Instructor */}
      <div className="mb-6 flex items-center">
        <Avatar className="w-16 h-16 mr-4">
          {course.image ? (
            <AvatarImage src={course.image} alt={course.instructor} />
          ) : (
            <AvatarFallback>
              {course.instructor
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="text-lg font-semibold">{course.instructor}</p>
          <p className="text-gray-600">Instructor</p>
        </div>
      </div>

      {/* Course Overall Details */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Course Details</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total Topics</TableCell>
              <TableCell>
                <span className="font-semibold">{course.topics.length}</span>{" "}
                topics covered in{" "}
                <span className="font-semibold">{course.title}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Level</TableCell>
              <TableCell>
                <span className="font-semibold">{course.course_level}</span>{" "}
                level
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Taught Language</TableCell>
              <TableCell>
                <span className="font-semibold">{course.language}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Course Duration</TableCell>
              <TableCell>
                <span className="font-semibold">{course.duration}</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Certification</TableCell>
              <TableCell>
                Complete the final assessment to receive a certificate.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">User Ratings</TableCell>
              <TableCell>
                Overall rating of this course:{" "}
                <span className="font-semibold"> {course.rating}</span> / 5
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Price</TableCell>
              <TableCell>
                <span className="font-semibold">
                  {" "}
                  Rs {course.price.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Students Enrolled</TableCell>
              <TableCell>
                <span className="font-semibold">
                  {course.students_enrolled.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AboutCourse
