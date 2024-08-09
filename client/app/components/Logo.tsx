import Link from "next/link"
import React from "react"

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="flex items-center text-[#A435F0] font-semibold text-xl hover:text-[#A435F0] transition-colors duration-300"
      >
        <span className="w-7 h-7 bg-[#A435F0] text-white flex items-center justify-center rounded-full mr-2">
          A
        </span>
        <span>𝐚𝐝𝐡𝐲𝐞𝐧</span>
      </Link>
    </div>
  )
}

export default Logo
