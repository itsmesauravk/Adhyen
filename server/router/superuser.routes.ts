import { Router } from "express"

import {
  registerSuperUser,
  loginSuperUser,
  getRequests,
} from "../controllers/superuser/index"

const router = Router()

//routes
router.post("/super-register", registerSuperUser)
router.post("/super-login", loginSuperUser)
router.get("/register-requests", getRequests)

export default router
