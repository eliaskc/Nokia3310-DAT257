

-- All timeslots (with isBooked column)

/*CREATE VIEW Timeslots AS 
SELECT date, time, endTime AS TIMEADD(HOUR, 2), guestP, isBooked AS 'lol'
FROM Bookings;
*/


-- Available Tables at specific date and time
SELECT Tables.tableID
FROM Tables 
LEFT OUTER JOIN BookedTables USING(tableID)
WHERE BookedTables.guestP IS NULL 
OR (SELECT CURRENT_DATE + INTERVAL '2 hour') > BookedTables.bookingDate;




-- Bookings 


-- Occupied seats at certain time

-- Shows tableID for all available timeslots 
SELECT t.tableID
FROM Tables AS t 
    LEFT OUTER JOIN BookedTables AS b 
    USING(tableID) 
    WHERE b.guestP IS NULL
    OR (SELECT CURRENT_DATE + INTERVAL '2 hour') > b.bookingDate;