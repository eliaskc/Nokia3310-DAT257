package se.chalmers.TDA257.booking;

import java.awt.print.Book;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Types;
import java.util.List;

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
                        rs.getDate(5), rs.getTime(6), rs.getString(7));
            }
        });
    }

    /**
     * Fetches all available times from the availableReservations view
     * 
     * @return List of Times
     */
    @Autowired
    public static List<Time> fetchAvailableTimes() {
        return jdbcTemplate.query("select * from availablereservations", new RowMapper<Time>() {
            @Override
            public Time mapRow(ResultSet rs, int rownumber) throws SQLException {
                return rs.getTime(2);
            }
        });
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

        int[] types = new int[] {Types.VARCHAR,Types.VARCHAR, Types.VARCHAR,
                Types.INTEGER, Types.DATE, Types.TIME, Types.VARCHAR};

        System.out.println(booking.toString());

        return jdbcTemplate.update(sqlQuery, params, types);
    }

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

}
