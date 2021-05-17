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
    private  JdbcTemplate jdbcTemplate;

    /**
     * Fetches all available times for the provided date, time and number of people
     * from the database
     * 
     * @param date       LocalDate date to check
     * @param time       Current time
     * @param nrOfPeople Number of people to book
     * @return
     */
    
    public  List<Time> fetchAvailableTimes(LocalDate date, LocalTime time, int nrOfPeople) {
        String sqlQuery = ("SELECT bookingDate, timeSlot, nrOfAvailableSeats FROM AvailableReservations"
                + " WHERE (?) <= nrOfAvailableSeats AND (?) = bookingDate AND (?) <= timeSlot");

        Object[] params = new Object[] { nrOfPeople, date, time };

        RowMapper<Time> rowMapper = new RowMapper<Time>() {
            @Override
            public Time mapRow(ResultSet rs, int rownumber) throws SQLException {
                return rs.getTime(2);
            }
        };

        return jdbcTemplate.query(sqlQuery, rowMapper, params);
    }

    
    public  List<Date> fetchAvailableDays(int nrOfPeople) {
        String sqlQuery = ("SELECT DISTINCT bookingDate FROM AvailableReservations"
                + " WHERE (?) <= nrOfAvailableSeats;");

        Object[] params = new Object[] { nrOfPeople };

        RowMapper<Date> rowMapper = new RowMapper<Date>() {
            @Override
            public Date mapRow(ResultSet rs, int rownumber) throws SQLException {
                return rs.getDate(1);
            }
        };
        return jdbcTemplate.query(sqlQuery, rowMapper, params);
    }

    /**
     * 
     */
    
    public  int insertNewBooking(Booking booking) {
        String sqlQuery = ("INSERT INTO BookingsView (" + "bookingDate, " + "startTime, " + "timeSlot," + "tableID, "
                + "bookingID," + "guestName, " + "guestTelNr, " + "nrOfPeople, "
                + "additionalInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

        Object[] params = new Object[] { booking.getBookingDate(), booking.getStartTime(), booking.getStartTime(), 0, 0,
                booking.getGuestName(), booking.getGuestTelNr(), booking.getNrOfPeople(), booking.getAdditionalInfo() };

        // String sqlQuery = "INSERT INTO Tables (tableID, nrOfSeats) VALUES (150, 2)";

        return jdbcTemplate.update(sqlQuery, params);
    }

    /**
     * Fetches all timeslots for a specific date
     */
    
    public  List<Time> fetchTimeSlotsByDate(Date date) {
        String sqlQuery = ("SELECT * FROM TimeSlots WHERE bookingDate = ? AND tableID = 1;");
        Object[] params = new Object[] { date };
        RowMapper rowMapper = new RowMapper<Time>() {
            @Override
            public Time mapRow(ResultSet rs, int rownumber) throws SQLException {
                return rs.getTime(4);
            }
        };
        return jdbcTemplate.query(sqlQuery, rowMapper, params);
    }

    /**
     * Fetches all bookings for a specific date
     */
    
    public  List<Booking> fetchBookingsByDate(Date date) {
        String sqlQuery = ("SELECT * FROM BookingsView WHERE bookingDate = ? AND guestTelNr IS NOT NULL");
        Object[] params = new Object[] { date };
        RowMapper<Booking> rowMapper = new RowMapper<Booking>() {
            @Override
            public Booking mapRow(ResultSet rs, int rownumber) throws SQLException {
                return new Booking(rs.getInt(5), rs.getString(6), rs.getString(7), rs.getInt(8), rs.getDate(1),
                        rs.getTime(2).toLocalTime(), rs.getString(9));
            }
        };
        return jdbcTemplate.query(sqlQuery, rowMapper, params);
    }

    /**
     * Fetches all bookings for a specific date and time
     */
    
    public  List<Booking> fetchBookingsByDateAndTime(Date date, Time time) {
        String sqlQuery = ("SELECT DISTINCT ON(bookingID) * from BookingsView WHERE bookingDate = ? AND timeSlot = ? AND bookingID IS NOT NULL");
        Object[] params = new Object[] { date, time };
        RowMapper<Booking> rowMapper = (rs, rownumber) -> new Booking(rs.getInt(5), rs.getString(6),
                rs.getString(7), rs.getInt(8), rs.getDate(1), rs.getTime(2).toLocalTime(), rs.getString(9));
        return jdbcTemplate.query(sqlQuery, rowMapper, params);
    }

    
    public  int fetchNumberOfBookedTablesByDateAndTime(Date date, Time time) {
        String sqlQuery = ("SELECT COUNT(*) FROM occupiedtimeslots WHERE bookingDate = ? AND timeSlot = ?");
        Object[] params = new Object[] { date, time };
        return jdbcTemplate.queryForObject(sqlQuery, Integer.class, params);
    }

    
    public  int deleteBookingByID(int bookingID) {
        String sqlQuery = ("DELETE FROM BookingsView WHERE bookingID = ?");
        Object[] params = new Object[] { bookingID };
        return jdbcTemplate.update(sqlQuery, params);
    }

    
    public int deleteBookingByTelNr(String telNr) {
        String sqlQuery = ("DELETE FROM BookingsView WHERE guestTelNr = ?");
        Object[] params = new Object[] { telNr };
        return jdbcTemplate.update(sqlQuery, params);
    }

    
    public Booking fetchBookingByTelNrDateTime(String telNr, Date date, LocalTime time) {
        String sqlQuery = ("SELECT DISTINCT ON(guestTelNr) * FROM BookingsView WHERE guestTelNr= ? AND bookingDate = ? AND timeslot = ?");
        Object[] params = new Object[] { telNr, date, time };
        RowMapper<Booking> rowMapper = (rs, rownumber) -> new Booking(rs.getInt(5), rs.getString(6),
                rs.getString(7), rs.getInt(8), rs.getDate(1), rs.getTime(2).toLocalTime(), rs.getString(9));
        return jdbcTemplate.queryForObject(sqlQuery, rowMapper, params);
    }

    
    public  int updateBooking(int bookingID, Booking updatedBooking) {
        deleteBookingByID(bookingID);
        return insertNewBooking(updatedBooking);
    }

    
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Scheduled method that once per day adds the booking times of the date two
     * weeks from the current day to the table BookingTimes in the database
     */
    @Scheduled(cron = "0 0 0 * * *")
    void dailyInsertBookingTimesDB() {
        String insertSqlQuery = ("INSERT INTO BookingTimes (" + "bookingDate, " + "startTime) VALUES (?, ?);");
        LocalDate dateToAdd = LocalDate.now().plusWeeks(3);
        List<LocalTime> bookingTimes = Arrays.asList(LocalTime.parse("17:00:00"), LocalTime.parse("17:30:00"),
                LocalTime.parse("18:00:00"), LocalTime.parse("18:30:00"), LocalTime.parse("19:00:00"),
                LocalTime.parse("19:30:00"), LocalTime.parse("20:00:00"), LocalTime.parse("20:30:00"),
                LocalTime.parse("21:00:00"), LocalTime.parse("21:30:00"), LocalTime.parse("22:00:00"),
                LocalTime.parse("22:30:00"));

        for (LocalTime bookingTime : bookingTimes) {
            jdbcTemplate.update(insertSqlQuery, new Object[] { dateToAdd, bookingTime });
        }
    }

    /**
     * Scheduled method that once per day removes the old booking times of yesterday
     */
    @Scheduled(cron = "0 0 0 * * *")
    void dailyDeleteBookingTimesDB() {
        String deleteSqlQuery = ("DELETE FROM BookingTimes WHERE bookingdate =" + "?" + " AND startTime =" + "?" + ";");
        LocalDate dateToDelete = LocalDate.now().minusDays(3);
        List<LocalTime> bookingTimes = Arrays.asList(LocalTime.parse("17:00:00"), LocalTime.parse("17:30:00"),
                LocalTime.parse("18:00:00"), LocalTime.parse("18:30:00"), LocalTime.parse("19:00:00"),
                LocalTime.parse("19:30:00"), LocalTime.parse("20:00:00"), LocalTime.parse("20:30:00"),
                LocalTime.parse("21:00:00"), LocalTime.parse("21:30:00"), LocalTime.parse("22:00:00"),
                LocalTime.parse("22:30:00"));

        for (LocalTime bookingTime : bookingTimes) {
            jdbcTemplate.update(deleteSqlQuery, new Object[] { dateToDelete, bookingTime });
        }
    }

    @Configuration
    @EnableScheduling
    class SchedulingConfiguration {

    }

}
