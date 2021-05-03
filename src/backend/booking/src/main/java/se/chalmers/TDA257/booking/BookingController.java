package se.chalmers.TDA257.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable long id) {
        Booking booking = bookings.deleteBooking(id);
        if (booking == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Updates the specified booking with the provided booking
     * @param id
     * @param booking
     */
    @PutMapping("/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable long id, @RequestBody Booking booking) {
        Booking b = bookings.saveBooking(booking);
        return new ResponseEntity<>(b, HttpStatus.OK);
    }

    /**
     * Adds a new booking
     * 
     * The id must be 0, as it will be assigned by the database
     * @param booking
     */
    @PostMapping("/bookings")
    public int addBooking(@RequestBody Booking booking) {
        System.out.println(booking);
        return DatabaseController.insertNewBooking(booking);
        //Booking b = bookings.saveBooking(booking);
        //URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                //.buildAndExpand(b.getId()).toUri();
        //return ResponseEntity.created(uri).build();
    }
}

