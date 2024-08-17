"use client"

import NavbarProvider from "@/app/components/provider/Navbar"
import ViewPieChart from "@/app/components/provider/PieChart"
import React, { useEffect, useState } from "react"

import courses from "@/data/courses.json"
import topics from "@/data/topics.json"
import { Course } from "@/app/types/page"
import { Topic } from "@/app/types/page"
import { useParams } from "next/navigation"
import ViewAreaChart from "@/app/components/provider/BarChart"
import ViewBarChart from "@/app/components/provider/BarChart"

const Analytics = () => {
  const [courseData, setCourseData] = useState<Course[]>([])
  const [topicData, setTopicData] = useState<Topic[]>([])

  const { pid } = useParams() //provider id

  useEffect(() => {
    const myCourses = courses.filter((course) => course.id === Number(pid))
    setCourseData(myCourses)
  }, [pid])

  useEffect(() => {
    const myTopics = topics.filter((topic) => topic.course_id === Number(pid))
    setTopicData(myTopics)
  }, [pid])

  console.log(topicData)

  return (
    <div>
      <NavbarProvider />
      <div>
        <div>
          <ViewPieChart topics={topicData} courses={courseData} />
        </div>
        <div>
          <ViewBarChart topics={topicData} />
        </div>
      </div>
    </div>
  )
}

export default Analytics
