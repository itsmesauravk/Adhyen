"use client"

import Footer from "@/app/components/Footer"
import NavbarProvider from "@/app/components/provider/Navbar"
import React, { useState } from "react"
import { toast } from "react-hot-toast"

const AddCoursePage = () => {
  const [showPrice, setShowPrice] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    isPaid: "free",
    price: 0,
    image: null,
    level: "",
    language: "",
  })

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isPaid = e.target.value === "paid"
    setShowPrice(isPaid)
    setFormData((prev) => ({ ...prev, isPaid: e.target.value }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const saveCourse = async () => {
      // Simulate form submission logic here (use your API call)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return formData
    }

    toast.promise(saveCourse(), {
      loading: "Adding course...",
      success: <b>Course added successfully!</b>,
      error: <b>Failed to add course.</b>,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <NavbarProvider />

      <div className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Course</h1>

        {/* Add Course Form */}
        <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
          {/* Course Title */}
          <div>
            <label className="block text-md font-semibold mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter course title"
              onChange={handleInputChange}
              value={formData.title}
            />
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-md font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Enter course description"
              onChange={handleInputChange}
              value={formData.description}
            ></textarea>
          </div>

          {/* Instructor Name */}
          <div>
            <label className="block text-md font-semibold mb-2">
              Instructor
            </label>
            <input
              type="text"
              name="instructor"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter instructor name"
              onChange={handleInputChange}
              value={formData.instructor}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-md font-semibold mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter course duration (e.g., 10 hours)"
              onChange={handleInputChange}
              value={formData.duration}
            />
          </div>

          {/* Paid / Free */}
          <div>
            <label className="block text-md font-semibold mb-2">
              Is the course paid?
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              name="isPaid"
              onChange={handlePaymentChange}
              value={formData.isPaid}
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Price */}
          {showPrice && (
            <div>
              <label className="block text-md font-semibold mb-2">Price</label>
              <input
                type="number"
                name="price"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter course price (e.g., $99)"
                onChange={handleInputChange}
                value={formData.price}
              />
            </div>
          )}

          {/* Image */}
          <div>
            <label className="block text-md font-semibold mb-2">
              Course Image
            </label>
            <input
              type="file"
              name="image"
              className="w-full p-2 border border-gray-300 rounded-md"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Course Level */}
          <div>
            <label className="block text-md font-semibold mb-2">
              Course Level
            </label>
            <select
              name="level"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleInputChange}
              value={formData.level}
            >
              <option value="">Select course level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-md font-semibold mb-2">Language</label>
            <select
              name="language"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={handleInputChange}
              value={formData.language}
            >
              <option value="">Select language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="korean">Korean</option>
              <option value="nepali">Nepali</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition"
            >
              Submit Course
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AddCoursePage
