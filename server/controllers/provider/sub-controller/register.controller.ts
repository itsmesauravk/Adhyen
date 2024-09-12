import { Request, Response, NextFunction } from "express"
import prisma from "../../../utils/prisma"
import { StatusCodes } from "http-status-codes"
import { uploadFile } from "../../../utils/cloudinary"
import { Multer } from "multer"

interface MulterRequest extends Request {
  file?: Express.Multer.File // 'file' for a single file upload
}

const registerProvider = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, address, contact, providerType } = req.body

    // Access the uploaded file (Multer)
    const documentFile = req.file // Use 'file' for single file

    console.log(name, email, address, contact, providerType, documentFile)

    if (
      !name ||
      !email ||
      !address ||
      !contact ||
      !providerType ||
      !documentFile
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields and upload a document",
      })
    }

    // Store the file path
    const documentImage = documentFile.path || ""

    const uploadDocs = await uploadFile(documentImage, "provider")

    if (!uploadDocs) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to upload document",
      })
    }

    console.log(uploadDocs)

    // Create the provider
    const provider = await prisma.provider.create({
      data: {
        name,
        email,
        address,
        contact,
        providerType,
        documentImage: uploadDocs.secure_url,
        documentImageId: uploadDocs.public_id,
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
    })
  } catch (error: any) {
    console.log(error)

    next(error)
  }
}

export default registerProvider
