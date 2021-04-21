package se.chalmers.TDA257.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingsTest bookings;

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookings.getAllBookings();
    }

    @GetMapping("/bookings/{id}")
    public Booking getBooking(@PathVariable long id) {

        return bookings.getBooking(id);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable long id) {
        Booking booking = bookings.deleteBooking(id);
        if (booking == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable long id, @RequestBody Booking booking) {
        Booking b = bookings.saveBooking(booking);
        return new ResponseEntity<>(b, HttpStatus.OK);
    }

    @PostMapping("/bookings")
    public ResponseEntity<Void> addBooking(@RequestBody Booking todo) {
        Booking b = bookings.saveBooking(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(b.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}

