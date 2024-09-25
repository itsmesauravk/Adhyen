import { Request, Response, NextFunction } from "express"
import prisma from "../../../utils/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const loginSuperUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      })
    }

    const validateEmail = await prisma.superuser.findFirst({
      where: {
        email: email,
      },
    })
    if (!validateEmail) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    const validatePassword = await bcrypt.compare(
      password,
      validateEmail.password
    )
    if (!validatePassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    const login = await prisma.superuser.findFirst({
      where: {
        email: email,
      },
    })

    if (!login) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    const token = jwt.sign({ id: login.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    })
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      data: login,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export default loginSuperUser
