"use client"

import Footer from "@/app/components/Footer"
import AddTopicForm from "@/app/components/provider/AddTopicForm"
import NavbarProvider from "@/app/components/provider/Navbar"

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarProvider />
      <div className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">
          Add Topic to Course
        </h1>
        <AddTopicForm />
      </div>
      <Footer />
    </div>
  )
}

export default Page
