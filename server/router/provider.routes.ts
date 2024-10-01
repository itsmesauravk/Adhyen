import express from "express"
const router = express.Router()
import uploader from "../utils/multer"

import { loginProvider, registerProvider } from "../controllers/provider"

router.post("/register-provider", uploader.single("image"), registerProvider)
router.post("/login-provider", loginProvider)

export default router
