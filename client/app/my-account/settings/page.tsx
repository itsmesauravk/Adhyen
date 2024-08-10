"use client"

import React from "react"
import ProfileNavbar from "@/app/components/profile/ProfileNavbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Page = () => {
  return (
    <div>
      <ProfileNavbar />
      <div className="container mx-auto px-4 lg:px-40 py-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <Tabs defaultValue="general" className="w-full max-w-4xl">
          <TabsList className="flex space-x-4 mb-6 border-b border-gray-200">
            <TabsTrigger
              value="general"
              className="flex items-center gap-1 text-green-600 hover:text-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              </svg>
              General
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              Privacy
            </TabsTrigger>
            <TabsTrigger
              value="account-delete"
              className="flex items-center gap-1 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                  clipRule="evenodd"
                />
              </svg>
              Account Delete
            </TabsTrigger>
            <TabsTrigger
              value="logout"
              className="flex items-center gap-1 text-red-900 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="general"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="language"
                >
                  Language
                </label>
                <select
                  id="language"
                  className="w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
                Save Changes
              </button>
            </div>
          </TabsContent>

          <TabsContent
            value="privacy"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
            <div className="space-y-6">
              {/* Profile Privacy */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Profile Privacy</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    <input type="checkbox" className="mr-2" />
                    Make profile private
                  </label>
                  <label className="block text-sm font-medium">
                    <input type="checkbox" className="mr-2" />
                    Allow search engines to index my profile
                  </label>
                </div>
              </div>

              {/* Change Password */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                <div className="space-y-2">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="current-password"
                    >
                      Current Password
                    </label>
                    <input
                      id="current-password"
                      type="password"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="new-password"
                    >
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="confirm-password"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Change Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Two-Factor Authentication
                </h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    <input type="checkbox" className="mr-2" />
                    Enable Two-Factor Authentication (TFA)
                  </label>
                  <p className="text-sm text-gray-600">
                    Adding an extra layer of security to your account by
                    requiring a code from your mobile device in addition to your
                    password.
                  </p>
                </div>
              </div>

              {/* Email Notifications */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Email Notifications
                </h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    <input type="checkbox" className="mr-2" />
                    Receive notifications about new messages
                  </label>
                  <label className="block text-sm font-medium">
                    <input type="checkbox" className="mr-2" />
                    Receive updates about system changes
                  </label>
                </div>
              </div>

              <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Save Changes
              </button>
            </div>
          </TabsContent>

          <TabsContent
            value="account-delete"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
            <p className="mb-4">
              This action will permanently delete your account and cannot be
              undone. Please proceed with caution.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
              Delete My Account
            </button>
          </TabsContent>

          <TabsContent
            value="logout"
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Logout</h2>
            <p className="mb-4">
              Are you sure you want to log out? Make sure to save any unsaved
              changes before logging out.
            </p>
            <button className="px-4 py-2 bg-red-900 text-white rounded-lg">
              Logout
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Page
