import express from "express"
const app = express()
const router = express.Router()

import { register } from "../controller/user.controller"

//routes
router.post("/register", register)

export default router
