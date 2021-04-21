

-- All timeslots (with isBooked column)

--CREATE VIEW Timeslots AS 
--SELECT date, time AS startTime, time+2 AS endTime, tableID, 
 --  'lol' AS isBooked, guestName, guestEmail
--FROM BookedTables, Bookings;


-- Available Times 



-- Bookings 


-- Occupied seats at certain time

-- Shows tableID for all available timeslots 
SELECT t.tableID
FROM Tables AS t 
    LEFT OUTER JOIN BookedTables AS b 
    USING(tableID) 
    WHERE b.guestP IS NULL
    OR (SELECT CURRENT_DATE + INTERVAL '2 hour') > b.bookingDate;