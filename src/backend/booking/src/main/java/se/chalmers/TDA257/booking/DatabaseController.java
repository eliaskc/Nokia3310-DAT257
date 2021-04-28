package se.chalmers.TDA257.booking;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class DatabaseController {
    @Autowired
    private static JdbcTemplate jdbcTemplate;
    private DataSource dataSource;

    @Autowired
    public static List<Booking> fetchAllBookings() {
        return jdbcTemplate.query("select * from Bookings", new RowMapper<Booking>() {
            @Override
            public Booking mapRow(ResultSet rs, int rownumber) throws SQLException {
                Booking e = new Booking(0, rs.getString(1), rs.getString(2), rs.getString(3), rs.getInt(4),
                        rs.getDate(5), rs.getTime(6));
                return e;
            }
        });
    }

    @Autowired
    public static List<Time> fetchAvailableTimes(){
        return jdbcTemplate.query("select * from availablereservations", new RowMapper<Time>() {
            @Override
            public Time mapRow(ResultSet rs, int rownumber) throws SQLException {
                return rs.getTime(2);
            }
        });
    }

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

}