
const { getEventById, updateEvent } = require("../events/events-controller");
const Booking = require("./bookings-model");

// the paramater booking is so it takes the data from the post request
const createBooking = async(bookingData) => {
    try {
        // create booking
        // 1. calculate total price
        // totalPrice = eventPrice * quantity
        // event - eventPrice
        // quantity - bookingData
        const event = await getEventById(bookingData.event);

        const totalPrice = bookingData.quantity * event.price;
        // add our totalPrice calculation to our incoming bookingData object
        bookingData.totalPrice = totalPrice;

        // 2. decrease available tickets from event
        // calculte tickets availble
        const newAvailableTickets = event.availableTickets - bookingData.quantity;

        // update event with the new amount of tickets
        // we need the event id
        // only need to update ticket amount, we don't need a variable for the event data
        await updateEvent(bookingData.event, {availableTickets: newAvailableTickets})

        const booking = await Booking.create(bookingData);
        return booking;

    } catch (error) {
        throw error;
    }
}

module.exports = {createBooking};