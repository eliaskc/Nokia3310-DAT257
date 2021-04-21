

-- All timeslots for all the tables
CREATE VIEW TimeSlots AS
    SELECT *, true AS isAvailable 
    FROM Tables, BookingTimes
    ORDER BY bookingDate, startTime;

-- Fetch all the availble timeslots. First selects all timeslots and removes all rows
-- with booked timeslots for the tables, then removes the timeslots that have a booking
-- coming up within 2 hours form the timeslot.
CREATE VIEW AvailableTimeSlots AS
    (SELECT tableID, bookingDate, startTime
    FROM TimeSlots
    EXCEPT (SELECT tableID, bookingDate, startTime
        FROM BookedTables))
    EXCEPT (SELECT tableID, bookingDate, startTime -200
        FROM BookedTables);


CREATE VIEW OccupiedTimeSlots AS
    (SELECT tableID, bookingDate, startTime 
    FROM TimeSlots
    EXCEPT (SELECT*
        FROM AvailableTimeSlots));

/*
-- Shows all available seats for a given time
CREATE VIEW NrOfAvailableSeats AS
    SELECT bookingDate, startTime, SUM(nrOfSeats) AS nrOfAvailableSeats
    FROM AvailableTimeSlots 
    GROUP BY bookingDate, startTime
    ORDER BY bookingDate, startTime;
*/