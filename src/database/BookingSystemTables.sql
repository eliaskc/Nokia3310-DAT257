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
    startTime TIME NOT NULL, --ev ändra detta sen så det är time
    PRIMARY KEY (bookingDate, startTime)
);

CREATE TABLE Tables (
    tableID INT PRIMARY KEY,
    nrOfSeats INT NOT NULL,
    CHECK (nrOfSeats=2)
);

--Tog bort GuestParties pga finns ingen anledning att prata om GP som en 
--egen entitet i detta sammanhang
CREATE TABLE Bookings (
    guestName TEXT NOT NULL,
    guestEmail TEXT,
    guestTelNr TEXT NOT NULL,
    nrOfPeople INTEGER NOT NULL,
    bookingDate DATE NOT NULL,
    startTime TIME NOT NULL,
    PRIMARY KEY(bookingDate, startTime, guestEmail),
    FOREIGN KEY (bookingDate, startTime) REFERENCES BookingTimes(bookingDate, startTime)
);


-- Connects the bookings made to specific tables
CREATE TABLE BookedTables (
    tableID INT REFERENCES Tables(tableID),
    bookingDate DATE ,
    startTime TIME,
    guestEmail TEXT ,
    FOREIGN KEY(bookingDate, startTime, guestEmail) 
        REFERENCES Bookings(bookingDate, startTime, guestEmail),
    PRIMARY KEY(tableID, bookingDate, startTime)
);
