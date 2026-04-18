

import express from "express";
import { manageEventController, deleteEventController, getEventsController } from "../controllers/eventController.js";

const router = express.Router()

/**
 * @swagger
 * /event/createEvent:
 *   post:
 *     summary: Create a new event (Admin only)
 *     tags: [Events]
 *     description: Create an event with name, date range, and capacity. Only admins are allowed.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startdate
 *               - enddate
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Conference 2026
 *               startdate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-15
 *               enddate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-16
 *               capacity:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event created successfully
 *               data:
 *                 eventid: 5
 *                 name: Tech Conference 2026
 *                 capacity: 100
 *                 created_by: 1
 *                 created_at: "2026-04-18T10:48:40.403Z"
 *                 updated_at: "2026-04-18T10:48:40.415Z"
 *                 startdate: "2026-06-15T00:00:00.000Z"
 *                 enddate: "2026-06-16T00:00:00.000Z"
 *       400:
 *         description: Validation error
 *       403:
 *         description: Only admin can perform this action
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Only admin can add or edit events
 *       500:
 *         description: Internal server error
 */
router.post('/createEvent', manageEventController);

/**
 * @swagger
 * /event/events:
 *   get:
 *     summary: Get all events with filters and pagination
 *     tags: [Events]
 *     description: Fetch events using optional date range and pagination
 *     parameters:
 *       - in: query
 *         name: startdate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events starting from this date
 *         example: 2026-06-12
 *       - in: query
 *         name: enddate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events up to this date
 *         example: 2026-06-30
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Events fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 eventsData:
 *                   - eventid: 2
 *                     name: Tech Conference 2026
 *                     capacity: 100
 *                     created_by: 1
 *                     created_at: "2026-04-18T09:35:21.219Z"
 *                     updated_at: "2026-04-18T09:35:21.323Z"
 *                     startdate: "2026-06-15T00:00:00.000Z"
 *                     enddate: "2026-06-16T00:00:00.000Z"
 *                 pagination:
 *                   total: 1
 *                   page: 1
 *                   limit: 10
 *                   pages: 1
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/events', getEventsController);

/**
 * @swagger
 * /event/event/{id}:
 *   put:
 *     summary: Update an event (Admin only)
 *     tags: [Events]
 *     description: Update event details by ID. Only admins are allowed.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startdate
 *               - enddate
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Conference updated
 *               startdate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-15
 *               enddate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-16
 *               capacity:
 *                 type: integer
 *                 example: 101
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event updated successfully
 *               data:
 *                 eventid: 2
 *                 name: Tech Conference updated
 *                 capacity: 101
 *                 created_by: 1
 *                 created_at: "2026-04-18T10:05:51.077Z"
 *                 updated_at: "2026-04-18T10:05:51.079Z"
 *                 startdate: "2026-06-15T00:00:00.000Z"
 *                 enddate: "2026-06-16T00:00:00.000Z"
 *       400:
 *         description: Validation error
 *       403:
 *         description: Only admin can update event
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Only admin can add or edit events
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.put('/event/:id', manageEventController);

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Delete an event (Admin only)
 *     tags: [Events]
 *     description: Delete an event by ID. Only admins are allowed.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *         example: 4
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: event deleted
 *               data:
 *                 eventid: 4
 *                 name: Tech Conference 2026
 *                 capacity: 100
 *                 created_by: 1
 *                 created_at: "2026-04-18T10:31:59.279Z"
 *                 updated_at: "2026-04-18T10:31:59.281Z"
 *                 startdate: "2026-06-15T00:00:00.000Z"
 *                 enddate: "2026-06-16T00:00:00.000Z"
 *       403:
 *         description: Only admin can delete event
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Only admin can add or edit events
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteEventController);

export default router



