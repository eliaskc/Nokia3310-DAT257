--CREATE DATABASE hamncafet_bookings;

\set QUIET true
SET client_min_messages TO WARNING; -- Less talk please.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
\set QUIET false

CREATE TABLE Tables (
    tableID INT NOT NULL,
    nrOfSeats INT NOT NULL,
    PRIMARY KEY(tableID),
    CHECK (nrOfSeats=2)
);

CREATE TABLE GuestParties (
    email TEXT PRIMARY KEY,
    telNr TEXT NOT NULL,
    nrOfPeople INTEGER NOT NULL,
    name TEXT NOT NULL,
    UNIQUE(telNr),
    CHECK (nrOfPeople <= 8 AND nrOfPeople >0)
);

CREATE TABLE Bookings (
    date DATE NOT NULL,
    time TIME NOT NULL,
    bookingID TEXT NOT NULL,
    guestP TEXT REFERENCES GuestParties(email),
    PRIMARY KEY(date, time, guestP),
    UNIQUE(bookingID)
);

CREATE TABLE BookedTables (
    tableID INT REFERENCES Tables(tableID),
    bookingDate DATE ,
    bookingTime TIME ,
    guestP TEXT ,
    FOREIGN KEY(bookingDate, bookingTime, guestP) 
        REFERENCES Bookings(date, time, guestP),
    UNIQUE(bookingDate, bookingTime, guestP)
);
