package se.chalmers.TDA257.booking;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalTime;

/**
 * Class for the booking object containing information about what time the booking is as well
 * as information about the guest
 */
@Getter @Setter
public class Booking {
    private long id = 0;
    private String guestName;
    private String guestEmail;
    private String guestTelNr;
    private int nrOfPeople;
    private Date bookingDate;
    private LocalTime startTime;
    private String additionalInfo;
    
    public Booking(String guestName, String guestEmail, String guestTelNr, int nrOfPeople, Date bookingDate,
            LocalTime startTime, String additionalInfo) {
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.guestTelNr = guestTelNr;
        this.nrOfPeople = nrOfPeople;
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.additionalInfo = additionalInfo;
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
                ", additionalInfo=" + additionalInfo +
                '}';
    }
}
