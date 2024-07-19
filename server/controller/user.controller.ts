import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import ApiResponse from "../utils/ApiResponse"
import bcrypt from "bcrypt"

// Register user
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar:
          "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
        contact: "",
        address: "",
        lastFivePasswords: [],
        twoFAEnabled: false,
        wrongPassCounter: 0,
        isPassBlockEnable: false,
        createdAt: new Date(),
      },
    })
    res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", user))
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "Error creating user" })
  }
}

export { register }
