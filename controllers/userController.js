import Joi from "joi";
import { loginUserService, registerUserService } from "../services/userService.js";

const registerUserController = async (req, res) => {
    try {

        // 🎯 Joi validation schema
        const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(100)
                .required()
                .messages({
                    "string.empty": "Username is required",
                    "any.required": "Username is required",
                }),

            emailid: Joi.string()
                .email()
                .required()
                .messages({
                    "string.email": "Invalid email format",
                    "string.empty": "Email is required",
                    "any.required": "Email is required",
                }),

            password: Joi.string()
                .min(6)
                .max(255)
                .required()
                .messages({
                    "string.empty": "Password is required",
                    "any.required": "Password is required",
                    "string.min": "Password must be at least 6 characters long"
                }),
            role: Joi.number()
                .valid(1, 2)
                .default(2)
                .optional()
                .messages({
                    "any.only": "Role must be either 1 (Admin) or 2 (User)",
                    "number.base": "Role must be a number"
                })
        });

        // Validate input
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        // ⭐ Call service
        const userServData = await registerUserService(req);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userServData
        });

    } catch (err) {
        console.error("Error in registerUserController:", err.message);

        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        })
    }
}


const loginUserController = async (req, res) => {
    try {
        // ✅ Joi validation schema
        const schema = Joi.object({
            emailid: Joi.string()
                .email()
                .required()
                .messages({
                    "string.email": "Please enter a valid email address",
                    "string.empty": "Email is required",
                    "any.required": "Email is required"
                }),

            password: Joi.string()
                .min(6)
                .required()
                .messages({
                    "string.empty": "Password is required",
                    "any.required": "Password is required",
                    "string.min": "Password must be at least 6 characters"
                }),
        });

        // Validate request body
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        // call service
        const loginUser = await loginUserService(req);

        res.status(200).json(loginUser);

    } catch (err) {
        console.error("Error in loginUserController:", err.message);

        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
}

export {
    registerUserController,
    loginUserController
}