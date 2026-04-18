import express from "express";
import { loginUserController, registerUserController } from "../controllers/userController.js";

const router = express.Router()

/**
 * @swagger
 * /user/registerUser:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - emailid
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               emailid:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *               role:
 *                 type: integer
 *                 enum: [1, 2]
 *                 example: 1
 *                 description: 1 = Admin, 2 = User
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User registered successfully
 *               data:
 *                 user_id: 3
 *                 username: admin
 *                 emailid: admin@gmail.com
 *                 password: "$2b$10$hashedpassword"
 *                 created_at: "2026-04-18T10:40:21.686Z"
 *                 role: 1
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post('/registerUser', registerUserController);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailid
 *               - password
 *             properties:
 *               emailid:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               emailid: admin@gmail.com
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUserController);

export default router