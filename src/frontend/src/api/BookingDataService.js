import axios from 'axios';

class BookingDataService {
    /**
     * 
     * @returns A JSON array of booking objects
     */
    retrieveAllBookings() {
        return axios.get(`http://localhost:8080/bookings`);
    }
}

export default new BookingDataService();