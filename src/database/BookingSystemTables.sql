--CREATE DATABASE hamncafet_bookings;

\set QUIET true
SET client_min_messages TO WARNING; -- Less talk please.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
\set QUIET false

--A table of all the allowed booking times for a given date
-- ev lägga till i schemat och det
CREATE TABLE BookingTimes (
    bookingDate DATE NOT NULL,
    timeSlot TIME NOT NULL,
    PRIMARY KEY (bookingDate, timeSlot)
);

CREATE TABLE Tables (
    tableID INT PRIMARY KEY,
    nrOfSeats INT NOT NULL,
    CHECK (nrOfSeats=2)
);

/*Tog bort GuestParties pga finns ingen anledning att prata om GP som en 
egen entitet i detta sammanhang*/
CREATE TABLE Bookings (
    bookingID INTEGER NOT NULL,
    guestName TEXT NOT NULL,
    guestTelNr TEXT NOT NULL,
    nrOfPeople INTEGER NOT NULL,
    bookingDate DATE NOT NULL,
    startTime TIME NOT NULL,
    timeSlot TIME NOT NULL,
    additionalInfo TEXT,
    PRIMARY KEY (bookingDate, timeSlot, guestTelNr),
    FOREIGN KEY (bookingDate, timeSlot) 
        REFERENCES BookingTimes(bookingDate, timeSlot) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX ON Bookings (bookingID);

-- Connects the bookings made to specific tables
CREATE TABLE BookedTables (
    tableID INT REFERENCES Tables(tableID),
    bookingDate DATE ,
    timeSlot TIME,
    guestTelNr TEXT ,
    FOREIGN KEY(bookingDate, timeSlot, guestTelNr) 
        REFERENCES Bookings(bookingDate, timeSlot, guestTelNr) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(tableID, bookingDate, timeSlot)
);
