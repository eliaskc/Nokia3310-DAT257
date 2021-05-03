package se.chalmers.TDA257.booking;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.time.LocalTime;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.sql.Date;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;


import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

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
     * Fetches all available times for the provided date, time and number of people from the database
     * @param date LocalDate date to check
     * @param time Current time
     * @param nrOfPeople Number of people to book
     * @return
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
        String sqlQuery = ("INSERT INTO BookingsView (" + "bookingDate, " + "startTime, " + "tableID, " + "guestEmail, " +
            "guestName, " + "guestTelNr, " + "nrOfPeople, " + "additionalInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)" );
        
        Object[] params = new Object[] {booking.getBookingDate(),booking.getStartTime(), 0, booking.getGuestEmail(), 
            booking.getGuestName(), booking.getGuestTelNr(), booking.getNrOfPeople(), booking.getAdditionalInfo()};

        // String sqlQuery = "INSERT INTO Tables (tableID, nrOfSeats) VALUES (150, 2)";

        return jdbcTemplate.update(sqlQuery, params);
    }

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource); 
    }

    /** 
     * Scheduled method that once per day adds the booking times of the date two weeks from the current day
     * to the table BookingTimes in the database
     */
    @Scheduled(cron = "0 0 0 * * *")
	void dailyInsertBookingTimesDB() throws InterruptedException {
		System.out.println("LOL*");
        String insertSqlQuery = ("INSERT INTO BookingTimes (" + "bookingDate, " + "startTime) VALUES (?, ?);");
        LocalDate dateToAdd = LocalDate.now().plusWeeks(2);
        List<LocalTime> bookingTimes = Arrays.asList(LocalTime.parse("17:00:00"), LocalTime.parse("17:30:00"), LocalTime.parse("18:00:00"), LocalTime.parse("18:30:00"),
        LocalTime.parse("19:00:00"), LocalTime.parse("19:30:00"), LocalTime.parse("20:00:00"), LocalTime.parse("20:30:00"), LocalTime.parse("21:00:00"),
        LocalTime.parse("21:30:00"), LocalTime.parse("22:00:00"), LocalTime.parse("22:30:00"));

        for (LocalTime bookingTime : bookingTimes) {
            jdbcTemplate.update(insertSqlQuery, new Object[]{dateToAdd, bookingTime});
        }
        return;
	}

    /**
     * Scheduled method that once per day removes the old booking times of yesterday
     */
    @Scheduled(cron = "0 0 0 * * *")
	void dailyDeleteBookingTimesDB() throws InterruptedException {
		System.out.println("asdfa");
        String deleteSqlQuery = ("DELETE FROM BookingTimes WHERE bookingdate =" + "?" + " AND startTime =" + "?"+ ";");
        LocalDate dateToDelete = LocalDate.now().minusDays(1);
        List<LocalTime> bookingTimes = Arrays.asList(LocalTime.parse("17:00:00"), LocalTime.parse("17:30:00"), LocalTime.parse("18:00:00"), LocalTime.parse("18:30:00"),
        LocalTime.parse("19:00:00"), LocalTime.parse("19:30:00"), LocalTime.parse("20:00:00"), LocalTime.parse("20:30:00"), LocalTime.parse("21:00:00"),
        LocalTime.parse("21:30:00"), LocalTime.parse("22:00:00"), LocalTime.parse("22:30:00"));

        for (LocalTime bookingTime : bookingTimes) {
            jdbcTemplate.update(deleteSqlQuery, new Object[]{dateToDelete, bookingTime});
        }
        return;
	}


    @Configuration
    @EnableScheduling
    class SchedulingConfiguration{

    }

}
