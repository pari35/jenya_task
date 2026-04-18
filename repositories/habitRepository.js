import prisma from "../lib/prisma.js"

const manageHabit = async (id, eventData) => {
    try {
        // update if id 
        if (id) {
            const eventDetails = await prisma.events.update({
                where: {
                    eventid: parseInt(id)
                },
                data: eventData
            })
            return eventDetails
        }

        const eventDetails = await prisma.events.create({
            data: eventData
        })
        return eventDetails
    } catch (error) {
        console.error("Error manage habit   :", error);
        throw error;
    }
}

const myEvents = async (filters, pagination) => {
    try {

        const { searchUser, startdate, enddate } = filters;
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;


        let whereConditions = {

        }

        if (startdate || enddate) {
            whereConditions.startdate = {};

            if (startdate) {
                whereConditions.startdate.gte = new Date(startdate);
            }

            if (enddate) {
                whereConditions.startdate.lte = new Date(enddate);
            }
        }

        const eventsCnt = await prisma.events.findMany({
            where: whereConditions,

        })

        // Get customers with pagination
        const eventsData = await prisma.events.findMany({
            where: whereConditions,
            skip,
            take: limit
        })

        return {
            eventsData,
            pagination: {
                total: eventsCnt.length,
                page,
                limit,
                pages: Math.ceil(eventsCnt.length / limit)
            }
        }

    } catch (error) {
        console.error("Error get user:", error.message);
        throw error;
    }
}

const deleteEvent = async (parsedeventId) => {
    try {
        
        const deleteEventDetails = await prisma.events.delete({
            where: {
                eventid: parsedeventId,
            }
        })
        return deleteEventDetails;

    } catch (error) {
        console.error("Error complete habit:", error);
        throw error; // ✔ send back to service to handle
    }
}

export {
    manageHabit,
    myEvents,
    deleteEvent,
}