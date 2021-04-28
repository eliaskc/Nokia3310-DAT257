package se.chalmers.TDA257.booking;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Getter @Setter
public class Booking {
    private long id;
    private String guestName;
    private String guestEmail;
    private String guestTelNr;
    private int nrOfPeople;
    private Date bookingDate;
    private Time startTime;
    
    public Booking(long id, String guestName, String guestEmail, String guestTelNr, int nrOfPeople, Date bookingDate,
            Time startTime) {
        this.id = id;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.guestTelNr = guestTelNr;
        this.nrOfPeople = nrOfPeople;
        this.bookingDate = bookingDate;
        this.startTime = startTime;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", guestName='" + guestName + '\'' +
                ", guestEmail='" + guestEmail + '\'' +
                ", guestTelNr='" + guestTelNr + '\'' +
                ", nrOfPeople=" + nrOfPeople +
                ", bookingDate=" + bookingDate +
                ", startTime=" + startTime +
                '}';
    }
}
