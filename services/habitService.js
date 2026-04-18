import { manageHabit, myEvents, deleteEvent } from "../repositories/habitRepository.js"

const manageEventService = async (id, value) => {
    try {

        const { name, startdate, enddate, capacity } = value

        const eventData = {
            name: name,
            startdate: startdate,
            enddate: enddate,
            capacity: capacity,
            created_at: new Date(),
        }

        let manageEventDetails = await manageHabit(id, eventData)
        return manageEventDetails
    } catch (err) {
        console.error('Error in manage task habit service:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

const getEventsService = async (req) => {

    let filters = {
        searchEvent: req.query.searchEvent || '',
        startdate: req.query.startdate,
        enddate: req.query.enddate
    }

    const pagination = {
        page: parseInt(req.query?.page) || 1,
        limit: parseInt(req.query?.limit) || 10
    }

    let myEventsDetails = await myEvents(filters, pagination)
    return myEventsDetails

}

const deleteEventService = async (parsedeventId) => {
    try {

        let deleteEventDetails = await deleteEvent(parsedeventId)
        return deleteEventDetails
    } catch (err) {
        console.error('Error in complete event service:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}

export {
    manageEventService,
    getEventsService,
    deleteEventService,
}