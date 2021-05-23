import axios from 'axios';

var apiURL = "https://api-hamncafe-test.herokuapp.com"

/**
 * Frontend service which handles the communication with the backend
 */

const header = {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json'}

class BookingDataService {
    retrieveAllAvailableTimes(date, time, guests) {
        return axios.get(apiURL + `/availableTimes`, {params: { 'date': date, 'time': time, 'guests': guests}})
    }

    retrieveAllAvailableDays(guests) {
        return axios.get(apiURL + `/availableDays`, { params: { 'guests': guests}})
    }

    retrieveBooking(id) {
        return axios.get(apiURL + `/bookings/${id}`, {headers: header});
    }

    /**
     * Updates the specified booking object
     * 
     * @param {Number} id 
     * @param booking JSON object of a booking
     */
    updateBooking(id, booking) {
        return axios.put(apiURL + `/bookings/${id}`, booking, {headers: header});
    }

    /**
     * Creates and adds new booking object
     * 
     * Value of id should always be 0, as it will be assigned by the backend
     * @param booking JSON object of a booking
     */
    createBooking(booking) {
        return axios.post(apiURL + `/bookings/create`, booking);
    }

    /**
     * Deletes the specified booking
     * 
     * @param {Number} id
     */
    deleteBooking(id) {
        return axios.delete(apiURL + `/bookings/id/${id}`, {headers: header});
    }
    
    deleteBookingTimes(date) {
        return axios.delete(apiURL + `/bookings/delete/${date}`, {headers: header});
    }

    addBookingTimes(date) {
        return axios.get(apiURL + `/bookings/add/${date}`, {headers: header});
    }
    
    getBookingsByDate(date) {
        return axios.get(apiURL + `/bookings/date/${date}`, {headers: header});
    }

    getBookingsByDateAndTime(date, time) {
        return axios.get(apiURL + `/bookings/date/${date}/${time}`, {headers: header});
    }

    getTimeSlotsByDate(date) {
        return axios.get(apiURL + `/timeslots/date/${date}`, {headers: header});
    }

    getNumberOfBookedTablesByDateAndTime(date, time) {
        return axios.get(apiURL + `/bookings/count/bookedtables/${date}/${time}`, {headers: header});
    }

    getNumberOfGuestsByDateAndTime(date, time) {
        return axios.get(apiURL + `/bookings/count/guests/${date}/${time}`, {headers: header});
    }

    authenticateUser(password) {
        return axios.post(apiURL + '/authenticate',  { 'username': 'admin', 'password': password });
    }

    isUserAuthenticated() {
        return axios.post(apiURL + '/validateToken', { 'token': localStorage.getItem('token') });
    }

    sendConfirmationSMS(booking) {
        return axios.post(apiURL + '/bookings/confirmation', booking);
    }
}

export default new BookingDataService();