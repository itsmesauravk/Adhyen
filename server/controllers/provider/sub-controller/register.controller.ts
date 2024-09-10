import { Request, Response } from "express"
import prisma from "../../../utils/prisma"
import { StatusCodes } from "http-status-codes"
import { Multer } from "multer"

// You need to tell TypeScript that req.files will contain files uploaded by multer
interface MulterRequest extends Request {
  files: Express.Multer.File[] // Declaring files as an array of Multer files
}

const registerProvider = async (req: MulterRequest, res: Response) => {
  try {
    const { name, email, address, contact, providerType } = req.body

    // Access the uploaded files (Multer)
    const documentFiles = req.files // Cast req to MulterRequest to access files

    // Validation: Check if all fields are present
    if (
      !name ||
      !email ||
      !address ||
      !contact ||
      !providerType ||
      !documentFiles ||
      documentFiles.length === 0
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields and upload a document",
      })
    }

    // Store only the first file's path as a string
    const documentImage = documentFiles[0]?.path || "" // If multiple files, only use the first one

    // Create the provider
    const provider = await prisma.provider.create({
      data: {
        name,
        email,
        address,
        contact,
        providerType,
        documentImage, // Only a single string path is stored here
      },
    })

    if (!provider) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to register provider",
      })
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Register Request Sent successfully",
      data: provider,
    })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    })
  }
}

export default registerProvider
