import React, { useState } from "react"

interface FormData {
  name: string
  description: string
  course: string
  instructor: string
  learningOutcomes: string[]
}

const AddTopicForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    course: "",
    instructor: "",
    learningOutcomes: [""],
  })

  // Simulated course options (replace with actual course data)
  const courseOptions = [
    { id: 1, title: "Course 1" },
    { id: 2, title: "Course 2" },
    { id: 3, title: "Course 3" },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLearningOutcomeChange = (index: number, value: string) => {
    const updatedOutcomes = [...formData.learningOutcomes]
    updatedOutcomes[index] = value
    setFormData((prev) => ({ ...prev, learningOutcomes: updatedOutcomes }))
  }

  const addLearningOutcome = () => {
    setFormData((prev) => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, ""],
    }))
  }

  const removeLearningOutcome = (index: number) => {
    const updatedOutcomes = formData.learningOutcomes.filter(
      (_, i) => i !== index
    )
    setFormData((prev) => ({ ...prev, learningOutcomes: updatedOutcomes }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here, you can replace the console.log with an API call to save the topic details
  }

  return (
    <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label className="block text-md font-semibold mb-2">Topic Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter topic name"
          onChange={handleInputChange}
          value={formData.name}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-md font-semibold mb-2">Description</label>
        <textarea
          name="description"
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={4}
          placeholder="Enter topic description"
          onChange={handleInputChange}
          value={formData.description}
        ></textarea>
      </div>

      {/* Course Dropdown */}
      <div>
        <label className="block text-md font-semibold mb-2">Course</label>
        <select
          name="course"
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={handleInputChange}
          value={formData.course}
        >
          <option value="">Select course</option>
          {courseOptions.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Instructor */}
      <div>
        <label className="block text-md font-semibold mb-2">Instructor</label>
        <input
          type="text"
          name="instructor"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter instructor name"
          onChange={handleInputChange}
          value={formData.instructor}
        />
      </div>

      {/* Learning Outcomes */}
      <div>
        <label className="block text-md font-semibold mb-2">
          Learning Outcomes
        </label>
        {formData.learningOutcomes.map((outcome, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder={`Learning outcome ${index + 1}`}
              value={outcome}
              onChange={(e) =>
                handleLearningOutcomeChange(index, e.target.value)
              }
            />
            <button
              type="button"
              className="ml-2 text-red-600"
              onClick={() => removeLearningOutcome(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-purple-400 text-white py-2 px-4 rounded-lg"
          onClick={addLearningOutcome}
        >
          Add Another Learning Outcome
        </button>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-main text-white font-bold py-2 px-6 rounded-lg hover:bg-mainhover transition"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddTopicForm
