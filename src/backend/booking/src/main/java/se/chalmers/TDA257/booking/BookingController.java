package se.chalmers.TDA257.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.xml.crypto.Data;
import java.net.URI;
import java.sql.Time;
import java.time.LocalTime;
import java.time.LocalDate;
import java.sql.Date;
import java.util.List;
/**
 * Controller for the backend which acts as a RESTful API
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingsTest bookings;

    /**
     * Fetches all bookings
     * @return list of Bookings
     */
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return DatabaseController.fetchAllBookings();
    }

    /**
     * Fetches all available times
     * @return list of Times
     */
    @GetMapping("/availableTimes")
    public List<Time> getAllAvailableTimes(@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date, @DateTimeFormat(pattern = "HH:mm:ss") LocalTime time, int guests){
        return DatabaseController.fetchAvailableTimes(date, time, guests);
    }

    /**
     * Fetches all available days
     * @param guests
     * @return
     */
    @GetMapping("/availableDays")
    public List<Date> getAllAvailableDays(int guests){
        return DatabaseController.fetchAvailableDays(guests);
    }

    /**
     * Fetches specified booking
     * @return Booking object
     */
    @GetMapping("/bookings/{id}")
    public Booking getBooking(@PathVariable long id) {
        return bookings.getBooking(id);
    }

    /**
     * Deletes specified booking if it exists
     */
    @DeleteMapping("/bookings/id/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
        int success = DatabaseController.deleteBookingByID(id);
        if (success != 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Adds a new booking
     * 
     * The id must be 0, as it will be assigned by the database
     * @param booking
     */
    @PostMapping("/bookings")
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {
        DatabaseController.insertNewBooking(booking);
        Booking b = DatabaseController.fetchBookingByEmailDateTime(booking.getGuestEmail(),booking.getBookingDate(),booking.getStartTime());
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(b.getBookingID()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/bookings/date/{date}")
    public List<Booking> getBookingByDate(@PathVariable Date date) {
        return DatabaseController.fetchBookingsByDate(date);
    }

    @GetMapping("/bookings/date/{date}/{time}")
    public List<Booking> getBookingByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        Time sqlTime = Time.valueOf(time);
        return DatabaseController.fetchBookingsByDateAndTime(date,sqlTime);
    }


    @GetMapping("/timeslots/date/{date}")
    public List<Time> getTimeSlotsByDate(@PathVariable Date date) {
        return DatabaseController.fetchTimeSlotsByDate(date);
    }

    @GetMapping("/bookings/count/{date}/{time}")
    public int getNumberOfBookingByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        Time sqlTime = Time.valueOf(time);
        return DatabaseController.fetchNumberOfBookingByDateAndTime(date,sqlTime);
    }

    /**
     * Updates the booking with specified id with the values from updatedBooking
     * @param id
     * @param updatedBooking
     * @return
     */
    @PutMapping("/bookings/{id}")
    public int updateBooking(@PathVariable int id, @RequestBody Booking updatedBooking) {
        System.out.println(updatedBooking.toString());
        return DatabaseController.updateBooking(id,updatedBooking);
    }

}

