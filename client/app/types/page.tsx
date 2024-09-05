// Course interface ==================================================

export interface Course {
  id: number
  title: string
  category: string
  image: string
  price: number
  likes: number
  rating: number
  instructor: string
  description: string
  duration: string
  slug: string
  isPaid: boolean
  students_enrolled: number
  course_views: number
  course_level: string
  provider: string
  topics: {
    id: number
    name: string
    description: string
  }[]
  topicsIds: number[]
  learning_outcomes: string[]
}

// Topic interface ==================================================

interface Comment {
  user_id: number
  comment: string
}

interface UserReview {
  user_id: number
  stars: number
}

interface VideoLink {
  video_id: number
  url: string
  added_on: string
  total_views: number
  video_brief_description: string
  comments: Comment[]
  completed_by: number[]
  started_by: number[]
  user_review: UserReview[]
}

export interface Topic {
  id: number
  name: string
  slug: string
  description: string
  course_id: number
  video_links: VideoLink[]
  likes: number
  reviews: number
  topic_views: number
  instructor: string
  learning_outcomes: string[]
}
