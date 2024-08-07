import React from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "./Logo"

const Navbar = () => {
  return (
    <header className=" flex text-gray-600 body-font h-16 border-b-2 fixed w-full z-[100] bg-white">
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
        <Logo />
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-[#842dc2] cursor-pointer">Home</a>
          <a className="mr-5 hover:text-[#842dc2] cursor-pointer">Courses</a>
          <a className="mr-5 hover:text-[#842dc2] cursor-pointer">Test</a>
          <a className="mr-5 hover:text-[#842dc2] cursor-pointer">
            Fourth Link
          </a>
        </nav>

        <Link href="/login">
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-[#b87be0] hover:text-white rounded text-base mt-4 md:mt-0">
            Login
          </button>
        </Link>

        {/* <Link
          className="flex p-2 rounded  justify-center items-center hover:bg-[#b87be0] hover:text-white"
          href="/profile"
        >
          <img
            src="/images/avatar.jpg"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="ml-3 ">Saurav Karki</p>
        </Link> */}
      </div>
    </header>
  )
}

export default Navbar
