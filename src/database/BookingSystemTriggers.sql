
--Does not need to check if there are sufficient seats, since this is checked when
--the data about available timeslots is fetched. Should only insert new bookings if
--there is an available timeslot.
CREATE OR REPLACE FUNCTION book() RETURNS trigger AS $book$
    DECLARE
        seatsLeft INTEGER;
        tempTableID INTEGER;

    BEGIN
        INSERT INTO Bookings VALUES (NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, NEW.startTime + INTERVAL '90 minutes');
        INSERT INTO Bookings VALUES (NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, NEW.startTime + INTERVAL '60 minutes');
        INSERT INTO Bookings VALUES (NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, NEW.startTime + INTERVAL '30 minutes');
        INSERT INTO Bookings VALUES (NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, NEW.startTime);
        
        --gör exception som fångar upp om man försöker boka in timeslots senare än 21
                seatsLeft = NEW.nrOfPeople;
        tempTableID = 1;

        WHILE (seatsLeft > 0) LOOP 
            IF EXISTS (
                SELECT *
                FROM AvailableTimeSlots AS ats
                WHERE ats.tableID=tempTableID AND ats.bookingDate=NEW.bookingDate AND ats.startTime=NEW.startTime
            )
            THEN 
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, NEW.startTime + INTERVAL '90 minutes', NEW.guestEmail);
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, NEW.startTime + INTERVAL '60 minutes', NEW.guestEmail);
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, NEW.startTime + INTERVAL '30 minutes', NEW.guestEmail);
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, NEW.startTime, NEW.guestEmail);
                seatsLeft = seatsLeft-2;
            
            END IF;

            tempTableID = tempTableID+1;
        
        END LOOP;
        RETURN NEW;
    END 
$book$ LANGUAGE plpgsql;

/*

CREATE OR REPLACE FUNCTION bookTables() RETURNS trigger AS $bookTables$
    DECLARE
        seatsLeft INTEGER;
        tempTableID INTEGER;

    BEGIN
        seatsLeft = NEW.nrOfPeople;
        tempTableID = 1;

        WHILE (seatsLeft > 0) LOOP 
            IF EXISTS (
                SELECT *
                FROM AvailableTimeSlots AS ats
                WHERE ats.tableID=tempTableID AND ats.bookingDate=NEW.bookingDate AND ats.startTime=NEW.startTime
            )
            THEN 
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, NEW.startTime, NEW.guestEmail);
                seatsLeft = seatsLeft-2;
                RAISE WARNING 'lol';
            
            END IF;

            tempTableID = tempTableID+1;
        
        END LOOP;
        RETURN NEW;
    END 
$bookTables$ LANGUAGE plpgsql;
*/


CREATE TRIGGER book INSTEAD OF INSERT OR UPDATE ON AllTimeSlots
    FOR EACH ROW EXECUTE FUNCTION book();
/*
CREATE TRIGGER bookTables AFTER INSERT OR UPDATE ON Bookings 
    FOR EACH ROW EXECUTE FUNCTION bookTables();
*/