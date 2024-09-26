"use client"
import Sidebar from "@/app/components/super-components/Sidebar"
import React from "react"
import { Pie, PieChart, Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { GiBookshelf } from "react-icons/gi"
import { FaUsers } from "react-icons/fa"
import { ImUserTie } from "react-icons/im"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

// Updated chart data for users (male vs female)
const userChartData = [
  { gender: "Male", count: 150, fill: "hsl(var(--chart-1))" },
  { gender: "Female", count: 120, fill: "hsl(var(--chart-2))" },
]

// Updated provider list data with dummy data
const providers = [
  {
    name: "John Doe",
    category: "Mathematics",
    rating: "4.8",
    totalStudents: 200,
  },
  {
    name: "Jane Smith",
    category: "Science",
    rating: "4.5",
    totalStudents: 180,
  },
  {
    name: "Alex Johnson",
    category: "Programming",
    rating: "4.9",
    totalStudents: 220,
  },
  {
    name: "Emily Brown",
    category: "English",
    rating: "4.7",
    totalStudents: 170,
  },
]

// Updated earnings chart data
const earningsChartData = [
  { month: "January", earned: 10000, given: 3000 },
  { month: "February", earned: 12000, given: 4000 },
  { month: "March", earned: 11000, given: 3500 },
  { month: "April", earned: 15000, given: 4500 },
  { month: "May", earned: 13000, given: 5000 },
  { month: "June", earned: 14000, given: 5500 },
]

// Pie chart configuration
const pieChartConfig = {
  male: { label: "Male", color: "hsl(var(--chart-1))" },
  female: { label: "Female", color: "hsl(var(--chart-2))" },
}

// Earnings chart configuration
const earningsChartConfig = {
  earned: { label: "Earned", color: "hsl(var(--chart-1))" },
  given: { label: "Given", color: "hsl(var(--chart-2))" },
}
interface User {
  name: string
  email: string
  id: string
  token: string
}
interface Session {
  user: User
  expires: string
}

const Page: React.FC<Session> = () => {
  const { data: SessionData, status } = useSession()
  const sessionData = SessionData as unknown as Session
  if (status === "loading") return <div>Loading...</div>
  if (status === "unauthenticated") return <div>Unauthenticated</div>

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold"> Dashboard</h1>
          <div className="flex items-center mt-4">
            <img
              src="/profile-pic.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-xl">{sessionData?.user?.name}</h2>
              <h2 className="text-xl">Admin</h2>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Students */}
          <Card className="flex justify-around items-center bg-[#C0DDE8]">
            <CardContent>
              <div className="flex items-center">
                <FaUsers className="text-4xl" /> {/* Increased icon size */}
                <div className="ml-4 ">
                  <h2 className="text-lg">Number of Students</h2>
                  <p className="text-2xl font-bold">100</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Providers */}
          <Card className="flex justify-around items-center bg-[#E4D0E7]">
            <CardContent>
              <div className="flex items-center ">
                <ImUserTie className="text-4xl " /> {/* Increased icon size */}
                <div className="ml-4">
                  <h2 className="text-lg">Number of Providers</h2>
                  <p className="text-2xl font-bold">50</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courses */}
          <Card className="flex justify-around items-center bg-[#D0C2E9]">
            <CardContent>
              <div className="flex items-center bg-[#D0C2E9]">
                <GiBookshelf className="text-4xl" /> {/* Increased icon size */}
                <div className="ml-4">
                  <h2 className="text-lg">Number of Courses</h2>
                  <p className="text-2xl font-bold">75</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue */}
          <Card className="flex justify-around items-center bg-[#C4EBD2]">
            <CardContent>
              <div className="flex items-center ">
                <RiMoneyDollarCircleFill className="text-4xl" />{" "}
                {/* Increased icon size */}
                <div className="ml-4">
                  <h2 className="text-lg">Total Revenue</h2>
                  <p className="text-2xl font-bold">$50,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Provider List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Pie Chart */}
          <Card>
            <CardHeader className="items-center pb-0">
              <CardTitle>Users Breakdown</CardTitle>
              <CardDescription>Male vs Female Users</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 overflow-hidden">
              {" "}
              {/* Added overflow hidden */}
              <ChartContainer config={pieChartConfig}>
                <PieChart width={250} height={250}>
                  {" "}
                  {/* Adjusted size */}
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={userChartData}
                    dataKey="count"
                    nameKey="gender"
                    fill={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Provider List */}
          <Card>
            <CardHeader>
              <CardTitle>Providers</CardTitle>
              <CardDescription>Top Rated Providers</CardDescription>
            </CardHeader>
            <CardContent className="overflow-y-auto h-64">
              {" "}
              {/* Made div scrollable */}
              <table className="w-full table-auto text-left">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Rating</th>
                    <th className="p-2">Total Students</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="p-2">{provider.name}</td>
                      <td className="p-2">{provider.category}</td>
                      <td className="p-2">{provider.rating}</td>
                      <td className="p-2">{provider.totalStudents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">See More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
