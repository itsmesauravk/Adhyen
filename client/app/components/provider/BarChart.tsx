"use client"

import React from "react"
import { Topic } from "@/app/types/page"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Generate chart data from topics prop
const generateChartData = (topics: Topic[]) => {
  return topics.map((topic) => ({
    name: topic.name,
    totalViews: topic.video_links.reduce(
      (acc, video) => acc + video.total_views,
      0
    ),
  }))
}

const chartConfig = {
  totalViews: {
    label: "Views",
    color: "#8884d8", // Use a colorful palette
  },
} satisfies ChartConfig

interface ViewBarChartProps {
  topics: Topic[]
}

const ViewBarChart = ({ topics }: ViewBarChartProps) => {
  const chartData = generateChartData(topics)

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Bar Chart - Topics Overview</CardTitle>
        <CardDescription>Shows total views per topic</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            width={400} // Smaller width
            height={50} // Smaller height
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="totalViews" fill="#82ca9d" radius={4} />{" "}
            {/* Colorful bar */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the total views for each topic
        </div>
      </CardFooter>
    </Card>
  )
}

export default ViewBarChart
