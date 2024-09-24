"use client"
import React from "react"
import Link from "next/link"
import { FaHome, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa"
import { MdOutlineDashboard } from "react-icons/md"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FiUsers } from "react-icons/fi"
import { RiUserReceived2Line } from "react-icons/ri"
import {
  RiAdvertisementLine,
  RiMessage3Line,
  RiMoneyDollarCircleLine,
} from "react-icons/ri"
import { usePathname } from "next/navigation"
import path from "path"

const Sidebar = () => {
  const pathname = usePathname()
  const lastPath = path.basename(pathname).toLowerCase()

  return (
    <div className="h-screen w-64 bg-maindark text-white flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 bg-primaryHover">
        <h1 className="text-xl font-semibold">Super Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow mt-8">
        <ul className="space-y-2">
          <li>
            <Link
              href="/super-user/dashboard"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "dashboard" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <MdOutlineDashboard className="mr-2" />
              Dashboard
            </Link>
          </li>
          {/* notification  */}
          <li>
            <Link
              href="/super-user/notifications"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "notifications" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <IoMdNotificationsOutline className="mr-2" />
              Notifications{" "}
              <span className="text-base bg-red-500 text-white px-2 rounded-full ml-2">
                5
              </span>
            </Link>
          </li>
          {/* user  */}
          <li>
            <Link
              href="/super-user/users"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "users" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <FaUsers className="mr-2" />
              Users
            </Link>
          </li>
          {/* providers  */}
          <li>
            <Link
              href="/super-user/providers"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "provider" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <FiUsers className="mr-2" />
              Providers
            </Link>
          </li>
          {/* provider-requests  */}
          <li>
            <Link
              href="/super-user/provider-requests"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "provider-requests" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <RiUserReceived2Line className="mr-2" />
              Requests{" "}
              <span className="text-base bg-red-500 text-white px-2 rounded-full ml-2">
                2
              </span>
            </Link>
          </li>
          {/* ads  */}
          <li>
            <Link
              href="/super-user/ads"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "ads" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <RiAdvertisementLine className="mr-2" />
              Ads
            </Link>
          </li>
          {/* feedbacks  */}
          <li>
            <Link
              href="/super-user/feedbacks"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "feedbacks" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <RiMessage3Line className="mr-2" />
              Feedbacks
            </Link>
          </li>

          {/* earnings  */}
          <li>
            <Link
              href="/super-user/revenue"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "revenue" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <RiMoneyDollarCircleLine className="mr-2" />
              Revenue
            </Link>
          </li>

          <li>
            <Link
              href="/super-user/settings"
              className={`flex items-center px-4 py-2 text-lg transition ${
                lastPath === "settings" ? "bg-lightdark" : ""
              } hover:bg-lightdark`}
            >
              <FaCog className="mr-2" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto mb-4">
        <Link
          href="/logout"
          className={`flex items-center px-4 py-2 text-lg transition ${
            lastPath === "logout" ? "bg-lightdark" : ""
          } hover:bg-lightdark`}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
