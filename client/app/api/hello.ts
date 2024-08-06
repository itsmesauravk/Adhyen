// pages/api/hello.js
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "This is a GET request",
  })
}

export async function POST() {
  return NextResponse.json({
    message: "This is a POST request",
  })
}
