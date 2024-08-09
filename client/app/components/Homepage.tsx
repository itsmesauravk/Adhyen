import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../Auth/AuthContext"
import Navbar from "./Navbar"
import Footer from "./Footer"
import HomeLanding from "./HomeLanding"
import PopularCourses from "./PopularCourses"
import HireTeacher from "./HireTeacher"

const Homepage: React.FC = () => {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/login")
  //   }
  // }, [isLoggedIn, router])

  // if (!isLoggedIn) {
  //   return null // or a loading indicator
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 lg:px-40">
        <HomeLanding />
        <PopularCourses />
        <HireTeacher />
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
