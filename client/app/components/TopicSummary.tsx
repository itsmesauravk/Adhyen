import React, { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import courseTopics from "../../data/topics.json"

interface Topic {
  id: number
  name: string
  slug: string
  course_id: number
  video_links: string[]
  likes: number
  topic_views: number
  learning_outcomes: string[]
}

interface TopicSummaryProps {
  courseId: number
}

const TopicSummary: React.FC<TopicSummaryProps> = ({ courseId }) => {
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    setTopics(
      courseTopics.filter((topic) => {
        return topic.course_id == courseId
      }) || []
    )
  }, [courseId])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Explore the summary of the course - {topics.length} topics
        </h2>
      </div>
      <Accordion type="single" collapsible>
        {topics.map((topic) => (
          <AccordionItem key={topic.id} value={`item-${topic.id}`}>
            <AccordionTrigger>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                <h3 className="text-lg font-semibold">{topic.name}</h3>
                <div className="flex justify-between items-center text-sm text-gray-500 space-x-4 mt-2 sm:mt-0">
                  <p>{topic.video_links.length} videos</p>
                  <p>{topic.likes} likes</p>
                  <p>{topic.topic_views} views</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-lg font-semibold mt-4">Learning Outcomes:</p>
              <ul className="mt-2 space-y-2">
                {topic.learning_outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-main">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default TopicSummary
