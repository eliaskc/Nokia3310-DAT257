

-- All timeslots for all the tables
CREATE VIEW TimeSlots AS
    SELECT * 
    FROM Tables, BookingTimes
    ORDER BY bookingDate, startTime;


CREATE VIEW AllTimeSlots AS
    SELECT bookingDate, startTime, endTime, tableID, guestEmail,
    case
        WHEN guestEmail IS NULL THEN true ELSE false
    END AS isAvailable
    FROM
    Timeslots LEFT OUTER JOIN BookedTables
    USING (startTime, BookingDate, tableID)
    ORDER BY tableID;
/*
UPDATE ll 
    SET isAvailable = case when 
        (EXISTS( SELECT guestEmail FROM ll)) then 0 else 1
        end;*/

-- Fetch all the availble timeslots. First selects all timeslots and removes all rows
-- with booked timeslots for the tables, then removes the timeslots that have a booking
-- coming up within 2 hours form the timeslot.
CREATE VIEW AvailableTimeSlots AS
    SELECT tableID, bookingDate, startTime 
    FROM AllTimeSlots 
    WHERE isAvailable = true
    EXCEPT (SELECT tableID, bookingDate, startTime -200
        FROM BookedTables);

-- Shows all booked times
CREATE VIEW OccupiedTimeSlots AS
    SELECT tableID, bookingDate, startTime, guestEmail
    FROM AllTimeSlots
    WHERE isAvailable = false;


-- Shows all available seats per time and date
CREATE VIEW NrOfAvailableSeats AS
    SELECT bookingDate, startTime, COUNT(tableID)*2 AS nrOfAvailableSeats
    FROM AvailableTimeSlots 
    GROUP BY bookingDate, startTime
    ORDER BY bookingDate, startTime;
