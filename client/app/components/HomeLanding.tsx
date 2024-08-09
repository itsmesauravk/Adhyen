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
import Image from "next/image"

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
        <Image
          src="/images/heroimage1.jpg"
          alt="Slide 1"
          width={1920}
          height={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/heroimage3.jpeg"
          alt="Slide 2"
          width={1920}
          height={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/landingimg1.jpg"
          alt="Slide 3"
          width={1920}
          height={400}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/landingimg2.jpeg"
          alt="Slide 4"
          width={1920}
          height={400}
        />
      </SwiperSlide>
    </Swiper>
  )
}

export default HomeLanding
