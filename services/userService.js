import { registerUser } from "../repositories/userRepository.js"
import bcrypt from 'bcrypt'
import { AppError } from "../middlewares/errorHandler.js";
import jwt from 'jsonwebtoken'
import Joi from 'joi';

import prisma from "../lib/prisma.js"

const registerUserService = async (req) => {
    try {
        const schema = Joi.object({
            username: Joi.string().min(3).max(100).required(),
            emailid: Joi.string().email().required(),
            password: Joi.string().min(6).max(255).required(),
            role: Joi.number().valid(1, 2).optional().default(2)

        })

        const { error, value } = schema.validate(req.body);

        if (error) {
            // Throw error → controller will catch it
            throw new Error(error.details[0].message);
        }

        const { username, emailid, password, role } = value;

        const encpassword = await bcrypt.hash(password, 10);

        const userRegData = {
            username,
            emailid,
            password: encpassword,
            role: role
        };

        const regUser = await registerUser(userRegData)
        return regUser

    } catch (err) {
        console.error("Service Error:", err.message);
        throw err; // Send back to controller
    }
}


const loginUserService = async (req, res) => {

    const { emailid, password } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    console.log(`Login attempt from IP: ${ipAddress}`);

    if (emailid) {
        // Mobile login
        if (!password) {
            res.status(401).json("emailid and password are required")
        }

        const result = await authenticate({ emailid, password, ipAddress });
        return result
    }
}


const authenticate = async ({ emailid, password, ipAddress }) => {

    const result = await prisma.users.findUnique({
        where: {
            emailid: emailid,
        },
    })

    if (!result) {
        throw new AppError('Invalid Emailid', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, result.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid password', 401);
    }

    // create JWt token
    const token = jwt.sign(
        {
            emailid: emailid,
            userid: result.user_id,
            role: result.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    )

    return {
        emailid: emailid,
        token
    }
}

export {
    registerUserService,
    loginUserService
}