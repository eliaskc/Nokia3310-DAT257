package se.chalmers.TDA257.booking;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;
import java.sql.Date;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

/**
 * Handles communication by performing queries to the database
 */
@Component
public class DatabaseController {
    @Autowired
    private static JdbcTemplate jdbcTemplate;
    private DataSource dataSource;

    /**
     * Fetches all bookings from the bookings view
     * 
     * @return List of Bookings
     */
    @Autowired
    public static List<Booking> fetchAllBookings() {
        return jdbcTemplate.query("select * from Bookings", new RowMapper<Booking>() {
            @Override
            public Booking mapRow(ResultSet rs, int rownumber) throws SQLException {
                return new Booking(rs.getString(1), rs.getString(2), rs.getString(3), rs.getInt(4),
                        rs.getDate(5), rs.getTime(6).toLocalTime(), rs.getString(7));
            }
        });
    }

    /**
     * Fetches all available times from the availableReservations view
     * 
     * @return List of Times
     */
    @Autowired
    public static List<Time> fetchAvailableTimes(LocalDate date, LocalTime time, int nrOfPeople) {
        String sqlQuery = ("SELECT bookingDate, startTime, nrOfAvailableSeats FROM AvailableReservations" + 
        " WHERE (?) <= nrOfAvailableSeats AND (?) = bookingDate AND (?) <= startTime;");

        Object[] params = new Object[] {nrOfPeople, date, time};

        RowMapper<Time> rowMapper = new RowMapper<Time>() {
            @Override
            public Time mapRow(ResultSet rs, int rownumber) throws SQLException {
                return rs.getTime(2);
            }
        };

        return jdbcTemplate.query(sqlQuery, rowMapper, params);
    }

    /**
     * 
     */
    @Autowired
    public static int insertNewBooking(Booking booking) {
        String sqlQuery = ("INSERT INTO Bookings (" + "guestName, " + "guestEmail, " + "guestTelNr, " + "nrOfPeople, "
                + "bookingDate, " + "startTime, " + "additionalInfo) VALUES (?, ?, ?, ?, ?, ?, ?);");

        Object[] params = new Object[] {booking.getGuestName(),booking.getGuestEmail(), booking.getGuestTelNr(), 
            booking.getNrOfPeople(), booking.getBookingDate(), booking.getStartTime(), booking.getAdditionalInfo()};

        for (Object o : params) {
            System.out.println(o.getClass());
        }

        // String sqlQuery = "INSERT INTO Tables (tableID, nrOfSeats) VALUES (150, 2)";

        return jdbcTemplate.update(sqlQuery, params);
    }

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

}
