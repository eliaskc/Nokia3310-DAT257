import axios from 'axios';

class BookingDataService {
    /**
     * 
     * @returns A JSON array of booking objects
     */
    retrieveAllBookings() {
        return axios.get(`http://localhost:8080/bookings`);
    }

    /**
     * valid id's are positive non zero integers
     * @returns A JSON object of a Booking
     */
    retrieveBooking(id) {
        return axios.get(`http://localhost:8080/bookings/${id}`);
    }

    updateBooking(id,booking) {
        return axios.put(`http://localhost:8080/bookings/${id}`, booking);
    }

    createBooking(booking) {
        return axios.post(`http://localhost:8080/bookings`, booking);
    }

    deleteBooking(id) {
        return axios.delete(`http://localhost:8080/bookings/${id}`);
    }


}

export default new BookingDataService();