"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Logo from "./Logo"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import categoriesAll from "@/data/category.json"

interface Category {
  id: number
  category: string
  slug: string
}

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // this will be changed  // dynamic role
  const pid = 1

  const userRole = "instructor"

  // const userRole = "student"

  useEffect(() => {
    setCategories(categoriesAll as Category[])
  }, [categories])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`Darling looking for : ${searchQuery}`)
  }

  return (
    <header className="fixed top-0 left-0 w-full h-16 border-b-2 bg-white z-50 shadow-md px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto flex items-center justify-between h-full">
        <Logo />

        <nav className="hidden md:flex flex-1 mx-10">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center justify-center space-x-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          href="/"
                          className="flex flex-col h-full w-full justify-end p-6 bg-gradient-to-b from-muted/50 to-muted rounded-md no-underline outline-none focus:shadow-md"
                        >
                          <h3 className="mb-2 mt-4 text-lg font-medium">
                            Adhyen
                          </h3>
                          <p className="text-sm text-muted-foreground leading-tight">
                            <span className="text-main">Adhyen</span> is an
                            innovative platform designed to offer personalized
                            learning experiences through interactive courses and
                            resources.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/category" title="Categories">
                      <span className="text-main">
                        Explore our vast categories for your learning and
                        improving new skills
                      </span>
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Courses Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <ListItem
                        key={category.id}
                        title={category.category}
                        href={`/category/${category.slug}`}
                      ></ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center space-x-2 bg-gray-100 p-2 rounded md:max-w-md lg:max-w-sm mx-2"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent outline-none flex-1"
          />
          <button type="submit" className="text-gray-600">
            🔍
          </button>
        </form>

        {userRole === "instructor" ? (
          <Link
            href={`/provider/${pid}/dashboard`}
            className="hidden md:flex items-center p-1 ml-2 rounded hover:bg-gray-100 transition"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <span className="ml-3">My Account</span>
          </Link>
        ) : (
          <Link
            href="/my-account"
            className="hidden md:flex items-center p-1 ml-2 rounded hover:bg-gray-100 transition"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <span className="ml-3">My Account</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none p-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
