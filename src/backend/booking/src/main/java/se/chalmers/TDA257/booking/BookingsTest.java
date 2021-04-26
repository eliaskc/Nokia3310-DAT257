package se.chalmers.TDA257.booking;

import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookingsTest {
    @Getter private static List<Booking> bookings = new ArrayList<>();
    private static long idCounter = 0;
    static {
        bookings.add(new Booking(++idCounter,new Date(),1,"email@email1.com"));
        bookings.add(new Booking(++idCounter,new Date(),5,"email@email2.com"));
        bookings.add(new Booking(++idCounter,new Date(),3,"email@email3.com"));
        bookings.add(new Booking(++idCounter,new Date(),3,"email@email4.com"));
        bookings.add(new Booking(++idCounter,new Date(),2,"email@email5.com"));
        bookings.add(new Booking(++idCounter,new Date(),1,"email@email6.com"));
        bookings.add(new Booking(++idCounter,new Date(),4,"email@email7.com"));
    }

    public List<Booking> getAllBookings() {
        return bookings;
    }

    public Booking getBooking(long id) {
        for (Booking b: bookings) {
            if(id == b.getId()){
                return b;
            }
        }
        return null;
    }

    public Booking deleteBooking(long id){
        for (Booking b: bookings) {
            if(id == b.getId()){
                bookings.remove(b);
                return b;
            }
        }
        return null;
    }

    public Booking saveBooking(Booking booking) {
        if(0 >= booking.getId()){
            booking.setId(++idCounter);
            bookings.add(booking);
        } else {
            deleteBooking(booking.getId());
            bookings.add(booking);
        }
        return null;
    }


}
