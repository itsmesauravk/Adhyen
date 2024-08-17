"use client"

import React, { useEffect, useState } from "react"
import NavbarProvider from "@/app/components/provider/Navbar"
import { MdModeEditOutline } from "react-icons/md"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import courses from "@/data/courses.json"
import topics from "@/data/topics.json"
import { useSearchParams } from "next/navigation"

interface Course {
  id: number
  title: string
  category: string
  image: string
  price: number
  instructor: string
  description: string
  duration: string
  course_level: string
  topics: Topic[]
  learning_outcomes: string[]
}

interface TopicVideo {
  video_id: number
  url: string
  video_title: string
  video_brief_description: string
}

interface Topic {
  id: number
  name: string
  description: string
  video_links?: TopicVideo[] // Added video_links as an optional field
}

const EditCourse: React.FC = () => {
  const [courseData, setCourseData] = useState<Course | null>(null)
  const [topicsData, setTopicsData] = useState<Topic[]>([])

  const [editingField, setEditingField] = useState<string | null>(null)
  const [newOutcome, setNewOutcome] = useState<string>("")

  const getData = useSearchParams()
  const courseSlug = getData.get("course")

  useEffect(() => {
    const editCourseData = courses.find((course) => course.slug === courseSlug)
    setCourseData(editCourseData || null)
  }, [courseSlug])

  useEffect(() => {
    const courseTopics = topics.filter(
      (topic) => topic.course_id === courseData?.id
    )
    setTopicsData(courseTopics)
  }, [courseData])

  const handleInputChange = (field: keyof Course, value: string | number) => {
    setCourseData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleTopicInputChange = (
    topicId: number,
    field: keyof Topic,
    value: string | number
  ) => {
    if (!courseData) return
    const updatedTopics = courseData.topics.map((topic) =>
      topic.id === topicId ? { ...topic, [field]: value } : topic
    )
    setCourseData({ ...courseData, topics: updatedTopics })
  }

  const handleVideoLinkChange = (
    topicId: number,
    videoId: number,
    field: keyof TopicVideo,
    value: string | number
  ) => {
    if (!courseData) return
    const updatedTopics = courseData.topics.map((topic) => {
      if (topic.id === topicId && topic.video_links) {
        const updatedVideoLinks = topic.video_links.map((video) =>
          video.video_id === videoId ? { ...video, [field]: value } : video
        )
        return { ...topic, video_links: updatedVideoLinks }
      }
      return topic
    })
    setCourseData({ ...courseData, topics: updatedTopics })
  }

  const handleAddVideoLink = (topicId: number) => {
    if (!courseData) return
    const newVideoLink: TopicVideo = {
      video_id: Date.now(),
      url: "",
      video_title: "",
      video_brief_description: "",
    }

    const updatedTopics = courseData.topics.map((topic) => {
      if (topic.id === topicId) {
        const updatedVideoLinks = topic.video_links
          ? [...topic.video_links, newVideoLink]
          : [newVideoLink]
        return { ...topic, video_links: updatedVideoLinks }
      }
      return topic
    })

    setCourseData({ ...courseData, topics: updatedTopics })
  }

  const handleSaveChanges = () => {
    console.log("Saving changes...", courseData)
  }

  const handleAddOutcome = () => {
    if (newOutcome && courseData) {
      setCourseData((prevData) => ({
        ...prevData!,
        learning_outcomes: [...prevData!.learning_outcomes, newOutcome],
      }))
      setNewOutcome("")
    }
  }

  const renderEditableField = (field: keyof Course, value: string | number) => (
    <div className="flex items-center gap-2 p-2 bg-white rounded shadow-sm border border-gray-300 hover:bg-gray-100">
      {editingField === field ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => setEditingField(null)}
          className="border-none outline-none bg-transparent p-2 rounded w-full"
        />
      ) : (
        <span>{value}</span>
      )}
      <MdModeEditOutline
        onClick={() => setEditingField(field)}
        className="cursor-pointer text-gray-600"
      />
    </div>
  )

  const renderEditableTopicField = (
    topicId: number,
    field: keyof Topic,
    value: string | number
  ) => (
    <div className="flex items-center gap-2 p-2 bg-white rounded shadow-sm border border-gray-300 hover:bg-gray-100">
      {editingField === `${field}-${topicId}` ? (
        <input
          type="text"
          value={value}
          onChange={(e) =>
            handleTopicInputChange(topicId, field, e.target.value)
          }
          onBlur={() => setEditingField(null)}
          className="border-none outline-none bg-transparent p-2 rounded w-full"
        />
      ) : (
        <span>{value}</span>
      )}
      <MdModeEditOutline
        onClick={() => setEditingField(`${field}-${topicId}`)}
        className="cursor-pointer text-gray-600"
      />
    </div>
  )

  const renderEditableVideoField = (
    topicId: number,
    videoId: number,
    field: keyof TopicVideo,
    value: string | number
  ) => (
    <div className="flex items-center gap-2 p-2 bg-white rounded shadow-sm border border-gray-300 hover:bg-gray-100">
      {editingField === `${field}-${topicId}-${videoId}` ? (
        <input
          type="text"
          value={value}
          onChange={(e) =>
            handleVideoLinkChange(topicId, videoId, field, e.target.value)
          }
          onBlur={() => setEditingField(null)}
          className="border-none outline-none bg-transparent p-2 rounded w-full"
        />
      ) : (
        <span>{value}</span>
      )}
      <MdModeEditOutline
        onClick={() => setEditingField(`${field}-${topicId}-${videoId}`)}
        className="cursor-pointer text-gray-600"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarProvider />
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#A435F0] mb-6">
          Edit Course
        </h1>

        {courseData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">Title</h2>
                {renderEditableField("title", courseData.title)}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">
                  Category
                </h2>
                <select
                  value={courseData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full border p-2 rounded-md"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="AI">AI</option>
                </select>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">
                  Image URL
                </h2>
                <img
                  src={courseData.image}
                  alt={courseData.title}
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
                <div className="flex flex-col md:flex-row gap-4">
                  {renderEditableField("image", courseData.image)}
                  <Button variant="outline">Upload Image</Button>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">Price</h2>
                {renderEditableField("price", courseData.price)}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">
                  Instructor
                </h2>
                {renderEditableField("instructor", courseData.instructor)}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">
                  Description
                </h2>
                {renderEditableField("description", courseData.description)}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">
                  Duration
                </h2>
                {renderEditableField("duration", courseData.duration)}
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#A435F0]">
                  Course Level
                </h2>
                {renderEditableField("course_level", courseData.course_level)}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#A435F0] mb-2">
                Learning Outcomes
              </h2>
              {courseData.learning_outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-white rounded shadow-sm border border-gray-300 mb-2 hover:bg-gray-100"
                >
                  <span>{outcome}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <Input
                  value={newOutcome}
                  onChange={(e) => setNewOutcome(e.target.value)}
                  placeholder="Add new outcome"
                />
                <Button variant="outline" onClick={handleAddOutcome}>
                  Add
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#A435F0] mb-2">
                Topics
              </h2>
              {topicsData.map((topic) => (
                <div key={topic.id} className="mb-4">
                  <h3 className="text-md font-semibold text-[#A435F0] mb-1">
                    {topic.name}
                  </h3>
                  {renderEditableTopicField(topic.id, "name", topic.name)}
                  <h4 className="text-sm text-gray-600 mb-1">Description</h4>
                  {renderEditableTopicField(
                    topic.id,
                    "description",
                    topic.description
                  )}
                  <h4 className="text-sm text-gray-600 mb-1">Video Links</h4>
                  {topic.video_links?.map((video) => (
                    <div key={video.video_id} className="ml-4 mb-2">
                      <h5 className="text-sm font-semibold text-[#A435F0]">
                        {renderEditableVideoField(
                          topic.id,
                          video.video_id,
                          "video_title",
                          video.video_title
                        )}
                      </h5>
                      {renderEditableVideoField(
                        topic.id,
                        video.video_id,
                        "url",
                        video.url
                      )}
                      <p className="text-xs text-gray-500 mb-1">
                        Brief Description
                      </p>
                      {renderEditableVideoField(
                        topic.id,
                        video.video_id,
                        "video_brief_description",
                        video.video_brief_description
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handleAddVideoLink(topic.id)}
                  >
                    Add Video Link
                  </Button>
                </div>
              ))}
            </div>

            <Button onClick={handleSaveChanges} className="w-full">
              Save All Changes
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default EditCourse
