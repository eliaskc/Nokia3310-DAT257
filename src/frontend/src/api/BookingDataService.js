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
     * @param booking JSON object of a booking containing id, BookingDate, numberOfPeople, email 
     */
    updateBooking(id,booking) {
        return axios.put(`http://localhost:8080/bookings/${id}`, booking);
    }

    /**
     * Creates and adds new booking object
     * 
     * Value of id should always be 0, as it will be assigned by the backend
     * @param booking JSON object of a booking containing id, BookingDate, numberOfPeople, email
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
        return axios.delete(`http://localhost:8080/bookings/${id}`);
    }

    getBookingsByDate(date){
        return axios.get(`http://localhost:8080/bookings/date/${date}`);
    }

    getBookingsByDateAndTime(date,time){
        return axios.get(`http://localhost:8080/bookings/date/${date}/${time}`);
    }

    getNumberOfBookingsByDateAndTime(date,time){
        return axios.get(`http://localhost:8080/bookings/count/${date}/${time}`);
    }


}

export default new BookingDataService();