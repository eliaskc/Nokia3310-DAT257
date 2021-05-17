package se.chalmers.TDA257.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.xml.crypto.Data;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import java.net.URI;
import java.sql.Time;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.LocalDate;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Controller for the backend which acts as a RESTful API
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private DatabaseController databaseController;

    /**
     * Fetches all available times
     * @return list of Times
     */
    @GetMapping("/availableTimes")
    public List<Time> getAllAvailableTimes(@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date, @DateTimeFormat(pattern = "HH:mm:ss") LocalTime time, int guests){
        return databaseController.fetchAvailableTimes(date, time, guests);
    }

    /**
     * Fetches all available days
     * @param guests
     * @return
     */
    @GetMapping("/availableDays")
    public List<Date> getAllAvailableDays(int guests){
        return databaseController.fetchAvailableDays(guests);
    }

    /**
     * Deletes specified booking if it exists
     */
    @DeleteMapping("/bookings/id/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
        int success = databaseController.deleteBookingByID(id);
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
        databaseController.insertNewBooking(booking);
        Booking b = databaseController.fetchBookingByTelNrDateTime(booking.getGuestTelNr(),booking.getBookingDate(),booking.getStartTime());
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(b.getBookingID()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/bookings/date/{date}")
    public List<Booking> getBookingByDate(@PathVariable Date date) {
        return databaseController.fetchBookingsByDate(date);
    }

    @GetMapping("/bookings/date/{date}/{time}")
    public List<Booking> getBookingByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        Time sqlTime = Time.valueOf(time);
        return databaseController.fetchBookingsByDateAndTime(date,sqlTime);
    }


    @GetMapping("/timeslots/date/{date}")
    public List<Time> getTimeSlotsByDate(@PathVariable Date date) {
        return databaseController.fetchTimeSlotsByDate(date);
    }

    @GetMapping("/bookings/count/bookedtables/{date}/{time}")
    public int getNumberOfBookedTablesByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        Time sqlTime = Time.valueOf(time);
        return databaseController.fetchNumberOfBookedTablesByDateAndTime(date,sqlTime);
    }

    @GetMapping("/bookings/count/guests/{date}/{time}")
    public int getNumberOfGuestsByDateAndTime(@PathVariable Date date, @PathVariable String time) {
        int nrOfGuests = 0;
        Time sqlTime = Time.valueOf(time);
        List<Booking> bookings = databaseController.fetchBookingsByDateAndTime(date,sqlTime);
        for (Booking b : bookings) {
            nrOfGuests += b.getNrOfPeople();
        }
        return nrOfGuests;
    }

    /**
     * Updates the booking with specified id with the values from updatedBooking
     * @param id
     * @param updatedBooking
     * @return
     */
    @PutMapping("/bookings/{id}")
    public int updateBooking(@PathVariable int id, @RequestBody Booking updatedBooking) {
        return databaseController.updateBooking(id,updatedBooking);
    }

    @GetMapping("/checkpassword")
    public String checkPassword(String password) {
        String pass = System.getenv("BookingAppPassword");
        if (pass == null){
            System.out.println("A password is not set in environment variables");
            return null;
        }
        
        if (pass.equals(password)){
            return createJWT();
        } else {
            return null;
        }
    }

    @GetMapping("/checkauthorizeuser")
    public Boolean checkAuthorizeUser(String jwt){
        //If the user doesn't have a JWT saved and tries to access restricted pages
        if (jwt == null){
            return false;
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256("LFThe3UVEK");
            JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("auth0")
                .build();
            DecodedJWT decodedJwt = verifier.verify(jwt);
            return true;
        } catch (JWTVerificationException exception){
            return false;
        }
    }


    /**
     * Creates a JSON Web Token used to authorize users 
     * @return
     */
    public String createJWT(){
        LocalDate date = LocalDate.now();
        ZoneId zoneId = ZoneId.systemDefault();
        long epoch = date.atStartOfDay(zoneId).toEpochSecond();
        epoch = (epoch + 86400);

        try {
            Algorithm algorithm = Algorithm.HMAC256("LFThe3UVEK");
            HashMap<String, Object> payloadClaims = new HashMap<>();
            payloadClaims.put("authorized", "true");
            payloadClaims.put("exp", epoch);
            String token = JWT.create()
                .withPayload(payloadClaims)
                .withIssuer("auth0")
                .sign(algorithm);
            return token;
        } catch (JWTCreationException exception){
            System.out.println("Invalid signing configuration");
            return "";
        }
    }
}
