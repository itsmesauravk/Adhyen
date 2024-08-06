import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <section
          className="relative bg-cover bg-center h-[80vh] rounded-lg shadow-md text-center p-6"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-white">
              Grow your skill to advance your career path
            </h2>
            <p className="text-gray-700 mt-2 max-w-lg">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
            <button className="mt-4 bg-[#A435F0] hover:bg-[#842dc2] text-white px-4 py-2 rounded">
              Join For Free
            </button>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mt-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by 100+ leading companies
          </h2>
          <div className="flex justify-around">
            <img src="/logos/fedex.png" alt="FedEx" className="h-12" />
            <img src="/logos/apple.png" alt="Microsoft" className="h-12" />
            <img src="/logos/google.png" alt="Google" className="h-12" />
            <img src="/logos/walmart.png" alt="Walmart" className="h-12" />
            <img src="/logos/airbnb.png" alt="Airbnb" className="h-12" />
          </div>
        </section>
        <section className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            More than just learning
          </h2>
          <p className="text-gray-600 mt-2 text-center">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
