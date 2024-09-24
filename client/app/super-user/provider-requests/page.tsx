import Sidebar from "@/app/components/super-components/Sidebar"
import React from "react"
import { Button } from "@/components/ui/button" // Assuming you're using Material UI for buttons

const dummyData = [
  { name: "Saurav Karki", type: "normal", status: "Pending" },
  { name: "John Doe", type: "normal", status: "Pending" },
  { name: "Jane Smith", type: "normal", status: "Pending" },
  { name: "Coursera", type: "organization", status: "Pending" },
]

const Page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Provider Requests
          </h1>
        </div>

        {/* Horizontal Line */}
        <div className="mb-6">
          <hr className="border-gray-300" />
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full bg-white table-auto">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-4 text-left text-gray-700 font-medium">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((provider, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 font-semibold">{provider.name}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      provider.type === "normal"
                        ? "text-blue-600"
                        : "text-orange-600"
                    }`}
                  >
                    {provider.type}
                  </td>
                  <td className="px-6 py-4">{provider.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="main" size="sm">
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white text-green-600 hover:bg-green-600 hover:text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page
