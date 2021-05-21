import axios from 'axios';

/**
 * Frontend service which handles the communication with the backend
 */
class BookingDataService {
    retrieveAllBookings() {
        return axios.get(`http://localhost:8080/bookings`);
    }

    retrieveAllAvailableTimes(date, time, guests) {
        return axios.get(`http://localhost:8080/availableTimes`, {
            params: {
                'date': date,
                'time': time,
                'guests': guests
            }
        });
    }

    retrieveAllAvailableDays(guests) {
        return axios.get(`http://localhost:8080/availableDays`, {
            params: {
                'guests': guests
            }
        });
    }

    retrieveBooking(id) {
        return axios.get(`http://localhost:8080/bookings/${id}`);
    }

    /**
     * Updates the specified booking object
     * 
     * @param {Number} id 
     * @param booking JSON object of a booking
     */
    updateBooking(id, booking) {
        return axios.put(`http://localhost:8080/bookings/${id}`, booking);
    }

    /**
     * Creates and adds new booking object
     * 
     * Value of id should always be 0, as it will be assigned by the backend
     * @param booking JSON object of a booking
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
    
    deleteBookingTimes(date) {
        return axios.delete(`http://localhost:8080/bookings/delete/${date}`);
    }

    addBookingTimes(date) {
        console.log(date)
        return axios.post(`http://localhost:8080/bookings/add/${date}`);
    }
    
    getBookingsByDate(date) {
        return axios.get(`http://localhost:8080/bookings/date/${date}`);
    }

    getBookingsByDateAndTime(date, time) {
        return axios.get(`http://localhost:8080/bookings/date/${date}/${time}`);
    }

    getTimeSlotsByDate(date) {
        return axios.get(`http://localhost:8080/timeslots/date/${date}`);
    }

    getNumberOfBookedTablesByDateAndTime(date, time) {
        return axios.get(`http://localhost:8080/bookings/count/bookedtables/${date}/${time}`);
    }

    getNumberOfGuestsByDateAndTime(date, time) {
        return axios.get(`http://localhost:8080/bookings/count/guests/${date}/${time}`);
    }

    /**
     * Calls the backend to check if the password is correct
     * @param {String} password 
     * @returns JSON object with JWT if correct and null otherwise
     */
    checkPassword(password) {
        return axios.get('http://localhost:8080/checkpassword', { params: { 'password': password } })
    }

    /**
     * Calls the backend to check if the user's JWT is authentic
     * @param {String} jwt 
     * @returns true if it it, false if not
     */
    checkAuthorizeUser(jwt) {
        return axios.get('http://localhost:8080/checkauthorizeuser', { params: { 'jwt': jwt } })
    }

}

export default new BookingDataService();