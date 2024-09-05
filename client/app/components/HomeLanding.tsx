import React from "react"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/autoplay"
import Image from "next/image"
import Logo from "./Logo"
import { Button } from "@/components/ui/button"

const HomeLanding = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      <SwiperSlide>
        <div className="flex items-center justify-between px-8 py-12">
          <div className="text-center md:text-left max-w-lg">
            <Logo />
            <p className="text-4xl font-bold mb-4">
              Become Expert At Your Choice
            </p>
            <p className="text-xl text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              reiciendis dolores tempora ipsam quisquam!
            </p>
            <Button className="mt-4" variant={"main"}>
              View Popular Courses
            </Button>
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/hero1.png"
              alt="hero-image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="flex items-center justify-between px-8 py-20">
          <div className="text-center md:text-left max-w-lg">
            <Logo />
            <p className="text-4xl font-bold  mb-4">
              Become Expert At Your Choice
            </p>
            <p className="text-xl text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              reiciendis dolores tempora ipsam quisquam!
            </p>
            <Button className="mt-4" variant={"main"}>
              View Popular Courses
            </Button>
          </div>
          <div className="hidden md:block">
            <Image
              src="/images/hero2.png"
              alt="hero-image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default HomeLanding
