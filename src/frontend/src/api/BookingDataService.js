import axios from 'axios';

/**
 * Frontend service which handles the communication with the backend
 */
class BookingDataService {
    /**
     * Fetches all bookings
     * 
     * @returns JSON array of Booking objects
     */
    retrieveAllBookings() {
        return axios.get(`http://localhost:8080/bookings`);
    }

    /**
     * @returns A JSON array of booking objects
     */
     retrieveAllAvailableTimes(date, time, guests) {
        return axios.get(`http://localhost:8080/availableTimes`, {params: {
            'date': date,
            'time': time,
            'guests': guests}
        });
    }

    /**
     * @returns A JSON array of booking objects
     */
     retrieveAllAvailableDays(guests) {
        return axios.get(`http://localhost:8080/availableDays`, {params: {
            'guests': guests}
        });
    }

    /**
     * Fetches specific booking
     * 
     * @param {Number} id
     * @returns JSON object of a Booking
     */
    retrieveBooking(id) {
        return axios.get(`http://localhost:8080/bookings/${id}`);
    }

    /**
     * @todo update booking parameters
     * Updates the specified booking object
     * 
     * @param {Number} id 
     * @param booking JSON object of a booking containing guest name (String), booking date (Date), numberOfPeople (int), 
     * phone number (String), booking time (Time), and possible additional info
     */
    updateBooking(id,booking) {
        return axios.put(`http://localhost:8080/bookings/${id}`, booking);
    }

    /**
     * Creates and adds new booking object
     * 
     * Value of id should always be 0, as it will be assigned by the backend
     * @param booking JSON object of a booking containing guest name (String), booking date (Date), numberOfPeople (int), 
     * phone number (String), booking time (Time), and possible additional info
     */
    createBooking(booking) {
        return axios.post(`http://localhost:8080/bookings`, booking);
    }

    /**
     * Deletes the specified booking
     * 
     * @param {Number} id
     */
    deleteBooking(id) {
        return axios.delete(`http://localhost:8080/bookings/id/${id}`);
    }

    getBookingsByDate(date){
        return axios.get(`http://localhost:8080/bookings/date/${date}`);
    }

    getBookingsByDateAndTime(date,time){
        return axios.get(`http://localhost:8080/bookings/date/${date}/${time}`);
    }


    getTimeSlotsByDate(date){
        return axios.get(`http://localhost:8080/timeslots/date/${date}`);
    }

    getNumberOfBookingsByDateAndTime(date,time){
        return axios.get(`http://localhost:8080/bookings/count/${date}/${time}`);
    }



}

export default new BookingDataService();