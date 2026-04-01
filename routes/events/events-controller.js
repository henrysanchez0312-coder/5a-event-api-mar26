
const Event = require("./events-model");

const getAllEvents = async () => {
    try {
        const events = await Event.find();
        return events;
    } catch (error) {
        throw error
    }
};
                        // it takes a parameter, to get the event back
const getEventById = async (eventId) => {
    try {
        const event = await Event.findById(eventId);

        // Here we deal with the false positive
        if(!event) {
            throw Error("Event not found")
        }
        return event;

    } catch (error) {
        throw error;
    }
};

const createEvent = async (eventData) => {
    try {
        const newEvent = await Event.create(eventData);
        return newEvent;
    } catch (error) {
        throw error;
    }
};

// PUT.               Need two parameters, one for the request params id, and for the body
const updateEvent = async (eventId, eventData) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            eventData,
            {new: true}
        )

        if(!updatedEvent) {
            throw Error ("Event not found")
        }
        return updatedEvent

    } catch (error) {
        throw error
    }
};

const deleteEvent = async (eventId) => {
    try {
        const eventToDelete = await Event.findByIdAndDelete(eventId);

        if(!eventToDelete) {
            throw Error("Event not found")
        }
        return eventToDelete

    } catch (error) {
        throw error
    }
}

module.exports = {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent};