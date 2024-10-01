import { Request, Response, NextFunction } from "express"
import prisma from "../../../utils/prisma"
import { StatusCodes } from "http-status-codes"
import { uploadFile } from "../../../utils/cloudinary"
import { Multer } from "multer"
import jwt from "jsonwebtoken"

// Login provider
const loginProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please provide email and password",
      })
    }

    // Check if provider exists
    const provider = await prisma.provider.findUnique({
      where: { email },
    })

    if (!provider) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Provider not found",
      })
    }

    // Compare password
    // const isMatch = await bcrypt.compare(password, provider.password)

    //token generation
    const token = jwt.sign(
      { id: provider.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    )

    //return
    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        token,
      },
    })
  } catch (error) {
    console.error("Provider Login error:", error)
    next(error)
  }
}

export default loginProvider
