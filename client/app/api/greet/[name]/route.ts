import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("hello")
  const url = new URL(request.url)
  const name = url.pathname.split("/").pop() || "Guest"

  const myProducts = [
    {
      id: 1,
      name: "Laptop",
      description: "A high-performance laptop with 16GB RAM and 512GB SSD.",
      price: 1200.0,
      category: "Electronics",
      stock: 25,
    },
    {
      id: 2,
      name: "Smartphone",
      description: "A smartphone with a 6.5-inch display and 128GB storage.",
      price: 799.99,
      category: "Electronics",
      stock: 50,
    },
    {
      id: 3,
      name: "Coffee Maker",
      description: "A programmable coffee maker with a 12-cup capacity.",
      price: 89.99,
      category: "Home Appliances",
      stock: 100,
    },
    {
      id: 4,
      name: "Electric Kettle",
      description: "A fast boiling electric kettle with a 1.7-liter capacity.",
      price: 34.99,
      category: "Home Appliances",
      stock: 75,
    },
    {
      id: 5,
      name: "Wireless Mouse",
      description: "A comfortable wireless mouse with adjustable DPI.",
      price: 29.99,
      category: "Accessories",
      stock: 200,
    },
    {
      id: 6,
      name: "Gaming Headset",
      description:
        "A gaming headset with surround sound and a noise-cancelling microphone.",
      price: 149.99,
      category: "Accessories",
      stock: 40,
    },
  ]

  return NextResponse.json({
    products: myProducts,
  })
}
