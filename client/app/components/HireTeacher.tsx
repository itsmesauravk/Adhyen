import React from "react"

const HireTeacher = () => {
  return (
    <section className="  p-8 mt-8 flex flex-col lg:flex-row items-center gap-8">
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Are you a certified teacher become an Instructor
        </h2>
        <p className="text-gray-600 mb-6">
          Join our community of educators and make a difference. Share your
          expertise and help students achieve their goals while growing your own
          teaching career.
        </p>
        <button className="bg-main text-white py-3 px-6 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-main-dark focus:ring-opacity-50">
          Become an Instructor
        </button>
      </div>
      <div className="flex-1 flex justify-center lg:justify-end">
        <img
          src="https://www.nicepng.com/png/full/258-2585445_happy-girl-with-laptop-professional-girl-image-png.png"
          alt="Become an Instructor"
          className="max-w-32 lg:max-w-md max-h-96 rounded-lg object-cover "
        />
      </div>
    </section>
  )
}

export default HireTeacher
