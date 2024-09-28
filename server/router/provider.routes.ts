import express from "express"
const router = express.Router()
import uploader from "../utils/multer"

import { registerProvider } from "../controllers/provider"

router.post("/register-provider", uploader.single("image"), registerProvider)

export default router
