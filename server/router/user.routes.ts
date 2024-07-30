import express from "express"
const app = express()
const router = express.Router()

import {
  register,
  getUser,
  loginUser,
  verify2FA,
  forgotPassword,
  resetPassword,
} from "../controller/user.controller"

//routes
router.post("/register", register)
router.get("/users", getUser)
router.post("/login", loginUser)
router.post("/twofa-validation", verify2FA)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router
