import Link from "next/link"
import React from "react"

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="flex items-center text-[#A435F0] font-semibold text-xl hover:text-[#A435F0] transition-colors duration-300"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#A435F0] to-[#6F21B4] shadow-xl mr-2 transform hover:scale-105 transition-transform duration-300 ease-out">
          <span className="text-white text-xl font-extrabold tracking-wide drop-shadow-lg">
            𝐀
          </span>
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-50 blur-sm"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-20"></div>
        </div>

        <span>𝐚𝐝𝐡𝐲𝐞𝐧</span>
      </Link>
    </div>
  )
}

export default Logo
