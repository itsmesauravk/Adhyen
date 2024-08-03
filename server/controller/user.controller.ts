import { Request, Response } from "express"
import prisma from "../utils/prisma"
import bcrypt from "bcrypt"
import { ApiError, TokenExpiredError } from "../utils/handleError"
import ApiResponse from "../utils/ApiResponse"
import jwt from "jsonwebtoken"
import { sendOtp2FA, sendForgotPasswordOtp } from "../utils/mails"

// Register user
// npx prisma migrate dev --name init
const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user, Prisma handles default values
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // Other fields will be set to their default values automatically
      },
    })

    // Update lastFivePasswords with the hashed password
    await prisma.user.update({
      where: { email },
      data: {
        lastFivePasswords: {
          push: hashedPassword,
        },
      },
    })

    res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", user))
  } catch (error) {
    console.error(error)
    res
      .status(400)
      .json({ success: false, message: "Error creating user", error })
  }
}

// get users
const getUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        avatar: true,
      },
    })
    if (!users)
      return res.status(404).json(new ApiError(404, "User not found."))
    return res.status(200).json(new ApiResponse(200, "User fetched", users))
  } catch (error) {
    console.log(error)
    res.status(400).json(new ApiError(404, "Internal Server Error"))
  }
}

//token generator
const generateToken = (id: number) => {
  const accessToken = jwt.sign(
    { id: id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "5m" }
  )
  const refreshToken = jwt.sign(
    { id: id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  )

  return { accessToken, refreshToken }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." })
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ succss: false, message: "Invalid email or password." })
    }

    // Verify the provided password
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." })
    }

    // Check if 2FA is enabled
    if (!user.twoFAEnabled) {
      // Generate tokens

      console.log(user.id)
      const { accessToken, refreshToken } = generateToken(user.id)

      // Store the refresh token in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      })

      // Set cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 5 * 60 * 1000, // 5 minutes
      })
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
      })

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        user,
        twoFAEnabled: false,
      })
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000) // 6-digit OTP

      // Send OTP to user's email
      sendOtp2FA(user.email, otp)

      // Store OTP in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { otp },
      })

      // Generate validate token
      const validateToken = jwt.sign(
        { id: user.id },
        process.env.VALIDATE_TOKEN_SECRET as string,
        { expiresIn: "5m" }
      )

      return res.status(200).json({
        success: true,
        message: "OTP sent to your email",
        token: validateToken,
        twoFAEnabled: true,
      })
    }
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// verify OTP

const verify2FA = async (req: Request, res: Response) => {
  try {
    const { token, otp } = req.body

    if (!token || !otp) {
      return res.status(400).json(new ApiError(400, "Token and OTP required"))
    }

    // Verify the validate token
    const decoded = jwt.verify(
      token,
      process.env.VALIDATE_TOKEN_SECRET as string
    ) as { id: number }

    if (!decoded) {
      return res.status(401).json(new ApiError(401, "Invalid or expired token"))
    }

    const { id } = decoded

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    })

    if (!user) {
      return res.status(404).json(new ApiError(404, "Unauthorize Request."))
    }

    if (user.otp === Number(otp)) {
      // remove OTP in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: 0 },
      })
      // Generate tokens
      const { accessToken, refreshToken } = generateToken(user.id)
      // Set cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 5 * 60 * 1000, // 5 minutes
      })
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
      })

      return res
        .status(200)
        .json(new ApiResponse(200, "Login Successful", user))
    } else {
      return res.status(401).json({ success: false, message: "Invalid OTP" })
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token expired" })
  }
}

// frogot password
const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json(new ApiError(400, "Email is required."))
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Generate validate token
    const validateToken = jwt.sign(
      { id: user.id },
      process.env.VALIDATE_TOKEN_SECRET as string,
      { expiresIn: "5m" }
    )
    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000) // 6-digit OTP

    // Send OTP to user's email
    sendForgotPasswordOtp(user.email, otp)

    // Store OTP in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { otp },
    })

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      token: validateToken,
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json(new ApiError(500, "Internal Server Error"))
  }
}

// reset password
const resetPassword = async (req: Request, res: Response) => {
  try {
    const { otp, validateToken, newPassword } = req.body
    // check if otp, validateToken and newPassword are provided
    if (!otp || !validateToken || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." })
    }

    // Verify the validate token
    const decoded = jwt.verify(
      validateToken,
      process.env.VALIDATE_TOKEN_SECRET as string
    ) as { id: number }

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" })
    }

    const { id } = decoded

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    })

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." })
    }

    // Check if the OTP is correct
    if (user.otp !== Number(otp)) {
      return res.status(401).json({ success: false, message: "Invalid OTP" })
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    //checking whater the new password is in the lastFivePasswords
    const checkPassword = user.lastFivePasswords.includes(hashedPassword)
    if (checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Password already used previously. Please use a new password.",
      })
    }

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // Remove the OTP from the database
    await prisma.user.update({
      where: { id: user.id },
      data: { otp: 0 },
    })

    // Update lastFivePasswords with the hashed password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastFivePasswords: {
          push: hashedPassword,
        },
      },
    })

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully!" })
  } catch (error) {
    console.error("Reset password error:", error)
    return res.status(500).json({ success: false, message: "Token Expired" })
  }
}

// export functions

export {
  register,
  getUser,
  loginUser,
  verify2FA,
  forgotPassword,
  resetPassword,
}
