import axios from 'axios';

/**
 * Frontend service which handles the communication with the backend
 */

const header = {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'}

class BookingDataService {
    retrieveAllBookings() {
        return axios.get(`http://localhost:8080/bookings`, {headers: header});
    }

    retrieveAllAvailableTimes(date, time, guests) {
        return axios.get(`http://localhost:8080/availableTimes`, {params: { 'date': date, 'time': time, 'guests': guests}})
    }

    retrieveAllAvailableDays(guests) {
        return axios.get(`http://localhost:8080/availableDays`, { params: { 'guests': guests}})
    }

    retrieveBooking(id) {
        return axios.get(`http://localhost:8080/bookings/${id}`, {headers: header});
    }

    /**
     * Updates the specified booking object
     * 
     * @param {Number} id 
     * @param booking JSON object of a booking
     */
    updateBooking(id, booking) {
        return axios.put(`http://localhost:8080/bookings/${id}`, booking, {headers: header});
    }

    /**
     * Creates and adds new booking object
     * 
     * Value of id should always be 0, as it will be assigned by the backend
     * @param booking JSON object of a booking
     */
    createBooking(booking) {
        return axios.post(`http://localhost:8080/bookings/create`, booking);
    }

    /**
     * Deletes the specified booking
     * 
     * @param {Number} id
     */
    deleteBooking(id) {
        return axios.delete(`http://localhost:8080/bookings/id/${id}`, {headers: header});
    }
    
    deleteBookingTimes(date) {
        console.log(date)
        return axios.delete(`http://localhost:8080/bookings/delete/${date}`);
    }

    getBookingsByDate(date) {
        return axios.get(`http://localhost:8080/bookings/date/${date}`, {headers: header});
    }

    getBookingsByDateAndTime(date, time) {
        return axios.get(`http://localhost:8080/bookings/date/${date}/${time}`, {headers: header});
    }


    getTimeSlotsByDate(date) {
        return axios.get(`http://localhost:8080/timeslots/date/${date}`, {headers: header});
    }

    getNumberOfBookedTablesByDateAndTime(date, time) {
        return axios.get(`http://localhost:8080/bookings/count/bookedtables/${date}/${time}`, {headers: header});
    }

    getNumberOfGuestsByDateAndTime(date, time) {
        return axios.get(`http://localhost:8080/bookings/count/guests/${date}/${time}`, {headers: header});
    }

    authenticateUser(password) {
        return axios.post('http://localhost:8080/authenticate',  { 'username': 'admin', 'password': password })
    }

    isUserAuthenticated() {
        return axios.post('http://localhost:8080/validateToken', { 'token': localStorage.getItem('token') })
    }

    sendConfirmationSMS(booking) {
        return axios.post('http://localhost:8080/bookings/confirmation', booking)
    }
}

export default new BookingDataService();