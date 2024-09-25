import { Request, Response, NextFunction } from "express"
import prisma from "../../../utils/prisma"
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcrypt"

const registerSuperUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields",
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const superUser = await prisma.superuser.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    if (!superUser) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to create superUser",
      })
    }
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "SuperUser created successfully",
      data: superUser,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default registerSuperUser
