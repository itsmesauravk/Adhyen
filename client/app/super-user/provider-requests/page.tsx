"use client"
import Sidebar from "@/app/components/super-components/Sidebar"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RegisterRequest {
  name: string
  address: string
  email: string
  contact: string
  documentImage: string
  providerType: string
  status: string
}

const Page = () => {
  const [requests, setRequests] = useState<RegisterRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedRequest, setSelectedRequest] =
    useState<RegisterRequest | null>(null)

  const getRequestHandler = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/super-user/register-requests`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.json()
      if (data.success) {
        setRequests(data.data)
        setLoading(false)
      } else {
        setError(data.message)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setError("Something went wrong")
      setLoading(false)
    }
  }

  const handleView = (request: RegisterRequest) => {
    setSelectedRequest(request)
  }

  const handleClose = () => {
    setSelectedRequest(null)
  }

  const handleAccept = () => {
    console.log("Accepted")
    // Add your logic here to handle accepting the request
  }

  const handleReject = () => {
    console.log("Rejected")
    // Add your logic here to handle rejecting the request
  }

  useEffect(() => {
    getRequestHandler()
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Provider Requests
          </h1>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-6">
          <hr className="border-gray-300" />
        </div>

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
              {requests &&
                requests.map((provider, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold">{provider.name}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        provider.providerType === "normal"
                          ? "text-blue-600"
                          : "text-orange-600"
                      }`}
                    >
                      {provider.providerType}
                    </td>
                    <td className="px-6 py-4">{provider.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleView(provider)}
                          variant="main"
                          size="sm"
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Modal for viewing details */}
        {selectedRequest && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Provider Details</h2>
              <p className="mb-2">
                <strong>Name:</strong> {selectedRequest.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {selectedRequest.email}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {selectedRequest.address}
              </p>
              <p className="mb-2">
                <strong>Contact:</strong> {selectedRequest.contact}
              </p>
              <p className="mb-2">
                <strong>Provider Type:</strong> {selectedRequest.providerType}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {selectedRequest.status}
              </p>

              <div className="mb-4">
                <Link target="_blank" href={selectedRequest.documentImage}>
                  <img
                    src={selectedRequest.documentImage}
                    alt="Document"
                    className="w-full h-64 object-cover"
                  />
                </Link>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="bg-green-500 text-white hover:bg-green-700"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  onClick={handleReject}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  Reject
                </Button>

                <Button
                  size="sm"
                  onClick={handleClose}
                  className="bg-gray-500 text-white hover:bg-gray-700"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
