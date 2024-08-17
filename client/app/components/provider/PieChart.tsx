"use client"

import React from "react"
import { Course, Topic } from "@/app/types/page"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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

// Predefined color variables
const predefinedColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig

interface ViewPieChartProps {
  topics: Topic[]
  courses: Course[]
}

const ViewPieChart: React.FC<ViewPieChartProps> = ({ topics, courses }) => {
  const chartData = React.useMemo(() => {
    return topics.map((topic, index) => {
      const totalTopicVisitors = topic.video_links.reduce((subTotal, video) => {
        // Ensure started_by is an array and sum the lengths
        if (Array.isArray(video.started_by)) {
          return subTotal + video.started_by.length
        }
        return subTotal
      }, 0)

      // Log calculated total visitors for the topic
      console.log(`Total Visitors for ${topic.name}: ${totalTopicVisitors}`)

      return {
        name: topic.name,
        visitors: totalTopicVisitors,
        fill: predefinedColors[index % predefinedColors.length], // Cycle through predefined colors
      }
    })
  }, [topics])

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Total Registered Users</CardTitle>
        <CardDescription>All time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors of All time
        </div>
      </CardFooter>
    </Card>
  )
}

export default ViewPieChart
