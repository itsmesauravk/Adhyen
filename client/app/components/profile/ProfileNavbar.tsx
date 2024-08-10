"use client"

import React, { useState } from "react"
import Logo from "../Logo"
import Link from "next/link"

const ProfileNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 lg:px-40">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/my-account"
                  className="text-gray-900 hover:bg-purple-200  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/my-account/courses"
                  className="text-gray-900 hover:bg-purple-200  px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Courses <span className="font-bold">(3)</span>
                </Link>
                <Link
                  href="/my-account/wishlist"
                  className="text-gray-900 hover:bg-purple-200  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Wishlist <span className="font-bold">(5)</span>
                </Link>
                <Link
                  href="/my-account/settings"
                  className="text-gray-900 hover:bg-purple-200  px-3 py-2 rounded-md text-sm font-medium"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 transition-transform ${
                  mobileMenuOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#"
              className="block bg-[#A435F0] text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="block text-gray-900 hover:bg-[#6F21B4] hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              My Courses <span className="font-bold">(3)</span>
            </Link>
            <Link
              href="#"
              className="block text-gray-900 hover:bg-[#6F21B4] hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Wishlist <span className="font-bold">(5)</span>
            </Link>
            <Link
              href="#"
              className="block text-gray-900 hover:bg-[#6F21B4] hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default ProfileNavbar
