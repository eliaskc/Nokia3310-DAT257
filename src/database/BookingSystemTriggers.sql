
--Does not need to check if there are sufficient seats, since this is checked when
--the data about available timeslots is fetched. Should only insert new bookings if
--there is an available timeslot.
CREATE OR REPLACE FUNCTION insertBooking() RETURNS trigger AS $insertBooking$
    DECLARE
        seatsLeft INTEGER;
        tempTableID INTEGER;
        tempBookingID INTEGER;
        tempstartTime Time;

    BEGIN
        tempStartTime := NEW.startTime;

        IF EXISTS (
            SELECT bookingID FROM Bookings WHERE OLD.bookingID = bookingID
        )
        THEN
            tempStartTime := (SELECT MIN(startTime) FROM Bookings WHERE bookingID = OLD.bookingID);
            DELETE FROM Bookings WHERE OLD.bookingID = bookingID;
        END IF;


        tempBookingID := (SELECT COALESCE(MAX(bookingID),0) FROM Bookings) + 1;


        INSERT INTO Bookings VALUES (tempBookingID, NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, tempStartTime + INTERVAL '90 minutes', NEW.additionalInfo);
        INSERT INTO Bookings VALUES (tempBookingID, NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, tempStartTime + INTERVAL '60 minutes', NEW.additionalInfo);
        INSERT INTO Bookings VALUES (tempBookingID, NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, tempStartTime + INTERVAL '30 minutes', NEW.additionalInfo);
        INSERT INTO Bookings VALUES (tempBookingID, NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, tempStartTime, NEW.additionalInfo);
        
        --gör exception som fångar upp om man försöker boka in timeslots senare än 21
        seatsLeft = NEW.nrOfPeople;
        tempTableID = 1;

        WHILE (seatsLeft > 0) LOOP 
            IF EXISTS (
                SELECT *
                FROM AvailableTimeSlots AS ats
                WHERE ats.tableID=tempTableID AND ats.bookingDate=NEW.bookingDate AND ats.startTime=tempStartTime
            )
            THEN 
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, tempStartTime + INTERVAL '90 minutes', NEW.guestEmail);
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, tempStartTime + INTERVAL '60 minutes', NEW.guestEmail);
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, tempStartTime + INTERVAL '30 minutes', NEW.guestEmail);
                INSERT INTO BookedTables VALUES (tempTableID, NEW.bookingDate, tempStartTime, NEW.guestEmail);
                seatsLeft = seatsLeft-2;
            
            END IF;

            tempTableID = tempTableID+1;
        
        END LOOP;
        RETURN NEW;
    END 
$insertBooking$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteBooking() RETURNS trigger AS $deleteBooking$
    BEGIN
        DELETE FROM Bookings WHERE OLD.bookingID = bookingID OR OLD.guestEmail = guestEmail;
        RETURN OLD;
    END 
$deleteBooking$ LANGUAGE plpgsql;


CREATE TRIGGER insertBooking INSTEAD OF INSERT OR UPDATE ON BookingsView
    FOR EACH ROW EXECUTE FUNCTION insertBooking();

CREATE TRIGGER deleteBooking INSTEAD OF DELETE ON BookingsView
    FOR EACH ROW EXECUTE FUNCTION deleteBooking();
