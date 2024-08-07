import React from "react"

const Landing = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] shadow-md text-center p-6"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75 rounded-lg"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl font-bold text-white">
          Grow your skill to advance your career path
        </h2>
        <p className="text-gray-700 mt-2 max-w-lg">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
        <button className="mt-4 bg-[#A435F0] hover:bg-[#842dc2] text-white px-4 py-2 rounded">
          Join For Free
        </button>
      </div>
    </section>
  )
}

export default Landing
