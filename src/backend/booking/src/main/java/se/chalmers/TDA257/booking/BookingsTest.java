package se.chalmers.TDA257.booking;

import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Initializes, stores and provides dummy booking data for the API
 */
@Service
public class BookingsTest {
    @Getter private static List<Booking> bookings = new ArrayList<>();
    private static int idCounter = 0;
    static {
        /*
        bookings.add(new Booking(++idCounter,new Date(),1,"081777200"));
        bookings.add(new Booking(++idCounter,new Date(),5,"081777201"));
        bookings.add(new Booking(++idCounter,new Date(),3,"081777202));
        bookings.add(new Booking(++idCounter,new Date(),3,"081777203"));
        bookings.add(new Booking(++idCounter,new Date(),2,"081777204));
        bookings.add(new Booking(++idCounter,new Date(),1,"081777205"));
        bookings.add(new Booking(++idCounter,new Date(),4,"081777206));
         */
    }

    public List<Booking> getAllBookings() {
        return bookings;
    }

    public Booking getBooking(long id) {
        for (Booking b: bookings) {
            if(id == b.getBookingID()){
                return b;
            }
        }
        return null;
    }

    public Booking deleteBooking(long id){
        for (Booking b: bookings) {
            if(id == b.getBookingID()){
                bookings.remove(b);
                return b;
            }
        }
        return null;
    }

    public Booking saveBooking(Booking booking) {
        if(0 >= booking.getBookingID()){
            booking.setBookingID(++idCounter);
            bookings.add(booking);
        } else {
            deleteBooking(booking.getBookingID());
            bookings.add(booking);
        }
        return null;
    }


}
