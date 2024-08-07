import React from "react"
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules"

import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/autoplay"

const HomeLanding = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <img src="/images/landingimg1.jpg" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/landingimg2.jpeg" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/landingimg3.png" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/background.jpg" alt="Slide 4" />
      </SwiperSlide>
    </Swiper>
  )
}

export default HomeLanding
