import { Request, Response, NextFunction } from "express"
import prisma from "../../../utils/prisma"
import { StatusCodes } from "http-status-codes"

// Get all requests unverified users requests
const getRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requests = await prisma.provider.findMany({
      where: {
        status: "pending",
      },
    })

    if (!requests || requests.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No requests found",
      })
    }

    return res.status(StatusCodes.ACCEPTED).json({
      success: true,
      data: requests,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export default getRequests
