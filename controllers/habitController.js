import Joi from "joi"
import { manageEventService, getEventsService, deleteEventService } from "../services/habitService.js"

const manageEventController = async (req, res) => {

    if (!req.user || req.user.role !== 1) {
        return res.status(403).json({
            success: false,
            message: "Only admin can add or edit events"
        })
    }

    // Validation schema for Habit (user_id allowed now)
    const schema = Joi.object({

        name: Joi.string().min(3).required().messages({
            'string.empty': 'name is required',
            'any.required': 'name is required'
        }),
        capacity: Joi.number().integer().min(1).required().messages({
            'number.base': 'Capacity must be a number',
            'number.integer': 'Capacity must be an integer',
            'number.min': 'Capacity must be at least 1',
            'any.required': 'Capacity is required'
        }),

        startdate: Joi.date().iso().greater('now').required().messages({
            'date.base': 'Date must be a valid date',
            'date.format': 'Date must be in ISO format (YYYY-MM-DD)',
            'date.greater': 'Date must be in the future',
            'any.required': 'Date is required'
        }),

        enddate: Joi.date().iso().min(Joi.ref('startdate')).required().messages({
            'date.base': 'End date must be a valid date',
            'date.min': 'End date must be greater than or equal to start date',
            'any.required': 'End date is required'
        }),
    })

    // Validate request body
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    try {

        // Service call with validated data
        const event = await manageEventService(req.params.id, value);

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event
        });

    } catch (err) {
        console.error("Error in manageeventController:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
}

const getEventsController = async (req, res) => {
    try {
        // Pass validated data to service
        const getEvents = await getEventsService(req);
        res.status(201).json({
            success: true,
            data: getEvents
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }

}

const deleteEventController = async (req, res) => {
    try {

        if (!req.user || req.user.role !== 1) {
            return res.status(403).json({
                success: false,
                message: "Only admin can delete events"
            })
        }

        const eventId = req.params.id;

        // Validation
        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: "event ID is required"
            });
        }

        const parsedeventId = parseInt(eventId);

        if (isNaN(parsedeventId)) {
            return res.status(400).json({
                success: false,
                message: "event ID must be a valid number"
            });
        }

        // Call service with eventId only
        const deleteEventDetails = await deleteEventService(parsedeventId);

        return res.status(201).json({
            success: true,
            message: "event deleted ",
            data: deleteEventDetails
        });

    } catch (err) {
        console.error("Error in delete event controller:", err.message);

        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
}

export {
    manageEventController,
    getEventsController,
    deleteEventController,
}