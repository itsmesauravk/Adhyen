import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ProfileNavbar from "../components/profile/ProfileNavbar"
import ContinueLearning from "../components/profile/ContinueLearning"
import RecentlyViewed from "../components/profile/RecentlyViewed"

const Page = () => {
  const currentHour = new Date().getHours()
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening"

  return (
    <div>
      <ProfileNavbar />
      <div className="container mx-auto px-4 lg:px-40">
        <div className="mt-10">
          <p className="text-xl font-bold text-gray-900">{greeting},</p>
          <p className="text-5xl font-extrabold text-gray-900">Saurav Karki</p>
        </div>
        {/* body  */}
        <div className="flex flex-col gap-14 mt-24">
          <ContinueLearning />
          <RecentlyViewed />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Page
