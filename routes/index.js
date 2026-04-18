import express from "express";
import { registerUserController } from "../controllers/userController.js";

import userRoutes from './userRoutes.js'
import eventRoutes  from './eventRoutes.js'
import { authMiddleware } from "../middlewares/authMidleware.js";

const router = express.Router()

// make routes
router.use('/user', userRoutes)

router.use('/event', authMiddleware, eventRoutes)

export default router 