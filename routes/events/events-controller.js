
const Event = require("./events-model");

// queryData = req.query
// in router we will call getAllEvents with the query data
const getAllEvents = async (queryData) => {
    try {

        // filter by category
        // object that will keep track of our filter queries
        const filterObject = {};

        // check the existance of the category
        // if it exists we add the property to our filterObject
        if(queryData.category) {
            filterObject.category = queryData.category;
        }

        if(queryData.date) {
            filterObject.date = queryData.date;
        }

        // Dealing with price
        // deal with a range, getting everything between the min price and the max price
                //if(queryData.minPrice && queryData.maxPrice) {
            // there is no min or max price so we have to work with the price and built in
            // $gte - greater than or equal to
            // $lte - less than or equal to
            filterObject.price = {
                $gte: queryData.minPrice || 0, // this way works better because it's not hitting the && above. If no min, default to 0
                $lte: queryData.maxPrice || Infinity // if no max, defult to infinity
            }
        //}

        // Sorting with mongodb
        // {propertyToSortBy: sortOrder}
        const sortObject = {}

        // sortObject[queryData.sortyBy]
        // first, evaluate queryData.sortBy
        // sortObject["title"] - same as sortObject.title
        sortObject[queryData.sortBy] = queryData.sortOrder


        // example: ?date=07-10-26&category=conference - only conference on july 10, 2026
        const events = await Event.find(filterObject).sort({ title: "asc"});

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