import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("hello")
  const url = new URL(request.url)
  const name = url.searchParams.get("name") || "Guest"
  return NextResponse.json({
    message: `Hello, ${name}!`,
  })
}

export async function POST() {
  return NextResponse.json({
    message: "This is a POST request",
  })
}
