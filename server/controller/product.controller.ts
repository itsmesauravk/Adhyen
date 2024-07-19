import { Request, Response } from "express"
import { Product } from "../models/product.model"
import prisma from "../utils/prisma"

// Create a new product

const createProduct = async (req: Request, res: Response) => {
  const { name, price, description }: Product = req.body
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
      },
    })
    res
      .status(201)
      .json({
        success: true,
        message: "Product added successfully",
        data: product,
      })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error adding product" })
  }
}
