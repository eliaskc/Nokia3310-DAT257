

-- All timeslots for all the tables
CREATE VIEW TimeSlots AS
    SELECT * 
    FROM Tables, BookingTimes
    ORDER BY bookingDate, startTime;

-- All timeslots with connected bookings if there are any. 
-- This is the view that is used for inserting a booking from the backend.
CREATE VIEW AllTimeSlots AS
    SELECT bookingDate, startTime, tableID, guestEmail, guestName, guestTelNr, nrOfPeople, additionalInfo,
    CASE
        WHEN guestEmail IS NULL THEN true ELSE false
    END AS isAvailable
    FROM
    Timeslots LEFT OUTER JOIN BookedTables USING (startTime, bookingDate, tableID)
    LEFT OUTER JOIN Bookings USING (guestEmail, startTime, bookingDate)
    ORDER BY bookingDate, tableID, startTime;


-- Fetch all the availble timeslots. First selects all timeslots and removes all rows
-- with booked timeslots for the tables, then removes the timeslots that have a booking
-- that starts within 2 hours before the timeslot. The latest available timeslot to book
-- before a another booking coming up is the one that is 1,5 hours before.
CREATE VIEW AvailableTimeSlots AS
    SELECT tableID, bookingDate, startTime
    FROM AllTimeSlots 
    WHERE isAvailable = true AND startTime < '21:30:00'
    EXCEPT (SELECT tableID, bookingDate, startTime - INTERVAL '90 minutes'
        FROM BookedTables)
    ORDER BY bookingDate, tableID, startTime;
    
    


--OBS!!!!! När hämtar i backend så måste queryn hämta "WHERE nrOfPeople >= nrOfAvailableSeats"
--Det är denna vi hämtar info om alla lediga tider med antal lediga platser till backend
-- Shows all available seats per time and date. Takes all available timeslots, groups them together
-- and adds a column for nr of available seats.
CREATE VIEW AvailableReservations AS
    SELECT bookingDate, startTime, COUNT(tableID)*2 AS nrOfAvailableSeats
    FROM AvailableTimeSlots 
    GROUP BY bookingDate, startTime
    ORDER BY bookingDate, startTime;


-- Shows all booked times
CREATE VIEW OccupiedTimeSlots AS
    SELECT tableID, bookingDate, startTime, guestEmail
    FROM AllTimeSlots
    WHERE isAvailable = false;
