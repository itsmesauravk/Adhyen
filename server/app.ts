import express, { Request, Response } from "express"
const app = express()
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Connect to PostgreSQL using Prisma
async function connectToDatabase() {
  try {
    await prisma.$connect()
    console.log("Connected to PostgreSQL database with Prisma")
  } catch (error) {
    console.error("Unable to connect to PostgreSQL database with Prisma", error)
  }
}

connectToDatabase()

import userRoutes from "./router/user.routes"

app.use(express.json())
app.use("/api/v1/user", userRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World")
})

export default app
