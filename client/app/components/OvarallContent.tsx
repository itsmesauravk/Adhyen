import Image from "next/image"
import React from "react"
import Transition from "./Transition"

const OverallContent = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">
          More Than Just a Platform
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore a comprehensive learning experience with a wide range of
          courses, top-notch instructors, and a thriving student community.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Transition>
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/totalstds.png"
              alt="category-image"
              width={50}
              height={50}
              className="mb-4"
            />
            <h3 className="text-2xl font-bold mb-3">1.7k+ Students</h3>
            <p className="text-base text-gray-600">
              Join a vibrant community of over 1,700 students learning new
              skills and advancing their careers.
            </p>
          </div>
        </Transition>
        <Transition>
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/instructors.png"
              alt="category-image"
              width={50}
              height={50}
              className="mb-4"
            />
            <h3 className="text-2xl font-bold mb-3">Learn from the Best</h3>
            <p className="text-base text-gray-600">
              Access courses taught by industry-leading instructors with years
              of experience.
            </p>
          </div>
        </Transition>
        <Transition>
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Image
              src="/images/course.png"
              alt="category-image"
              width={50}
              height={50}
              className="mb-4"
            />
            <h3 className="text-2xl font-bold mb-3">Over 50 Free Courses</h3>
            <p className="text-base text-gray-600">
              Dive into over 50 free courses available for students of all
              levels, from beginners to experts.
            </p>
          </div>
        </Transition>
      </div>
    </section>
  )
}

export default OverallContent
