import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("hello")
  const url = new URL(request.url)
  const name = url.pathname.split("/").pop() || "Guest"

  return NextResponse.json({
    message: `Hello, ${name}!`,
  })
}
