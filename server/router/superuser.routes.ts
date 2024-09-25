import { Router } from "express"

import {
  registerSuperUser,
  loginSuperUser,
} from "../controllers/superuser/index"

const router = Router()

//routes
router.post("/super-register", registerSuperUser)
router.post("/super-login", loginSuperUser)

export default router
