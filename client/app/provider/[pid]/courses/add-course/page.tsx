"use client"

import React, { useState, ChangeEvent, MouseEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import NavbarProvider from "@/app/components/provider/Navbar"

interface Topic {
  name: string
  video_link: string
  description: string
  learning_outcomes: string[]
}

interface CourseData {
  title: string
  category: string
  image: File | null
  price: string
  instructor: string
  description: string
  duration: string
  course_level: string
  learning_outcomes: string[]
  topics: Topic[]
}

const AddCourse: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    category: "",
    image: null,
    price: "",
    instructor: "",
    description: "",
    duration: "",
    course_level: "",
    learning_outcomes: [""],
    topics: [
      { name: "", video_link: "", description: "", learning_outcomes: [""] },
    ],
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLearningOutcomeChange = (index: number, value: string) => {
    const outcomes = [...courseData.learning_outcomes]
    outcomes[index] = value
    setCourseData((prev) => ({ ...prev, learning_outcomes: outcomes }))
  }

  const handleAddLearningOutcome = () => {
    setCourseData((prev) => ({
      ...prev,
      learning_outcomes: [...prev.learning_outcomes, ""],
    }))
  }

  const handleTopicLearningOutcomeChange = (
    topicIndex: number,
    outcomeIndex: number,
    value: string
  ) => {
    const topics = [...courseData.topics]
    const learning_outcomes = [...topics[topicIndex].learning_outcomes]
    learning_outcomes[outcomeIndex] = value
    topics[topicIndex] = { ...topics[topicIndex], learning_outcomes }
    setCourseData((prev) => ({ ...prev, topics }))
  }

  const handleAddTopicLearningOutcome = (topicIndex: number) => {
    const topics = [...courseData.topics]
    topics[topicIndex] = {
      ...topics[topicIndex],
      learning_outcomes: [...topics[topicIndex].learning_outcomes, ""],
    }
    setCourseData((prev) => ({ ...prev, topics }))
  }

  const handleTopicChange = (
    index: number,
    name: keyof Topic,
    value: string
  ) => {
    const topics = [...courseData.topics]
    topics[index] = { ...topics[index], [name]: value }
    setCourseData((prev) => ({ ...prev, topics }))
  }

  const handleAddTopic = () => {
    setCourseData((prev) => ({
      ...prev,
      topics: [
        ...prev.topics,
        { name: "", video_link: "", description: "", learning_outcomes: [""] },
      ],
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCourseData((prev) => ({ ...prev, image: e.target.files[0] }))
    }
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Submit logic here, like sending data to a server
    console.log("New Course Data:", courseData)
  }

  return (
    <div>
      <NavbarProvider />
      <div className="flex flex-col mx-auto px-4 lg:px-40 mt-8 space-y-8 mb-10">
        <h1 className="text-2xl font-bold text-[#A435F0] mb-6">
          Add New Course
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">
              Course Title
            </label>
            <Input
              name="title"
              placeholder="Enter course title"
              value={courseData.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">Category</label>
            <Select
              value={courseData.category}
              onValueChange={(value) =>
                setCourseData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginners">Beginners</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Machine Learning">
                  Machine Learning
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">
              Course Image
            </label>
            <Input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">Price</label>
            <Input
              name="price"
              type="number"
              placeholder="Enter course price"
              value={courseData.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">
              Instructor
            </label>
            <Input
              name="instructor"
              placeholder="Enter instructor name"
              value={courseData.instructor}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">Duration</label>
            <Input
              name="duration"
              placeholder="Enter course duration"
              value={courseData.duration}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-semibold mb-2">
              Course Level
            </label>
            <Select
              value={courseData.course_level}
              onValueChange={(value) =>
                setCourseData((prev) => ({ ...prev, course_level: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Course Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginners">Beginners</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-md font-semibold mb-2">
            Description
          </label>
          <Textarea
            name="description"
            placeholder="Enter course description"
            value={courseData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-md font-semibold mb-2">
            Learning Outcomes
          </label>
          {courseData.learning_outcomes.map((outcome, index) => (
            <div key={index} className="mb-2 flex items-center space-x-2">
              <Input
                placeholder={`Outcome ${index + 1}`}
                value={outcome}
                onChange={(e) =>
                  handleLearningOutcomeChange(index, e.target.value)
                }
                className="flex-1"
              />
            </div>
          ))}
          <Button onClick={handleAddLearningOutcome}>
            Add Learning Outcome
          </Button>
        </div>

        <div className="mb-6">
          <label className="block text-md font-semibold mb-2">Topics</label>
          {courseData.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="mb-4 border p-4 rounded">
              <div className="mb-4">
                <label className="block text-md font-semibold mb-2">
                  Topic Name
                </label>
                <Input
                  placeholder={`Topic ${topicIndex + 1}`}
                  value={topic.name}
                  onChange={(e) =>
                    handleTopicChange(topicIndex, "name", e.target.value)
                  }
                  className="mb-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold mb-2">
                  Video Link
                </label>
                <Input
                  placeholder={`Video Link ${topicIndex + 1}`}
                  value={topic.video_link}
                  onChange={(e) =>
                    handleTopicChange(topicIndex, "video_link", e.target.value)
                  }
                  className="mb-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold mb-2">
                  Description
                </label>
                <Textarea
                  placeholder={`Topic Description ${topicIndex + 1}`}
                  value={topic.description}
                  onChange={(e) =>
                    handleTopicChange(topicIndex, "description", e.target.value)
                  }
                  className="mb-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold mb-2">
                  Learning Outcomes
                </label>
                {topic.learning_outcomes.map((outcome, outcomeIndex) => (
                  <div
                    key={outcomeIndex}
                    className="mb-2 flex items-center space-x-2"
                  >
                    <Input
                      placeholder={`Outcome ${outcomeIndex + 1}`}
                      value={outcome}
                      onChange={(e) =>
                        handleTopicLearningOutcomeChange(
                          topicIndex,
                          outcomeIndex,
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                  </div>
                ))}
                <Button
                  onClick={() => handleAddTopicLearningOutcome(topicIndex)}
                >
                  Add Learning Outcome
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={handleAddTopic}>Add Topic</Button>
        </div>

        <Button onClick={handleSubmit} className="bg-[#A435F0] text-white">
          Submit Course
        </Button>
      </div>
    </div>
  )
}

export default AddCourse
