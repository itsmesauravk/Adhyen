"use client"
import Footer from "@/app/components/Footer"
import NavbarProvider from "@/app/components/provider/Navbar"
import React, { useState } from "react"

const Page = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [topic, setTopic] = useState("")
  const [videoPreview, setVideoPreview] = useState("")
  const [videoFile, setVideoFile] = useState(null)

  const handleAddVideo = () => {
    // Handle video addition logic here
    console.log("Video Added:", { title, description, topic, videoFile })
  }

  const handleVideoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setVideoFile(file)
      const fileURL = URL.createObjectURL(file)
      setVideoPreview(fileURL)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarProvider />
      <div className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Add Video</h1>
        <form
          className="space-y-6 max-w-2xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Video Title */}
          <div>
            <label className="block text-md font-semibold mb-2" htmlFor="title">
              Video Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter video title"
            />
          </div>

          {/* Video Brief Description */}
          <div>
            <label
              className="block text-md font-semibold mb-2"
              htmlFor="description"
            >
              Video Brief Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Enter brief description"
            />
          </div>

          {/* Topic */}
          <div>
            <label className="block text-md font-semibold mb-2" htmlFor="topic">
              Topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a topic</option>
              <option value="topic1">Topic 1</option>
              <option value="topic2">Topic 2</option>
              <option value="topic3">Topic 3</option>
            </select>
          </div>

          {/* Upload Video */}
          <div>
            <label
              className="block text-md font-semibold mb-2"
              htmlFor="videoFile"
            >
              Upload Video
            </label>
            <input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Video Preview */}
          {videoPreview && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Video Preview</h2>
              <video
                controls
                src={videoPreview}
                className="w-96 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleAddVideo}
              className="bg-main text-white font-bold py-2 px-6 rounded-lg hover:bg-mainhover transition"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Page
