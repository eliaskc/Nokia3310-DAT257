CREATE OR REPLACE FUNCTION book() RETURNS trigger AS $book$
    DECLARE
        seatsLeft INTEGER;
        tempTableID INTEGER;
    BEGIN
        INSERT INTO Bookings VALUES (NEW.guestName, NEW.guestEmail, NEW.guestTelNr, NEW.nrOfPeople, NEW.bookingDate, NEW.startTime);
        

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
$book$ LANGUAGE plpgsql;


CREATE TRIGGER book INSTEAD OF INSERT OR UPDATE ON AllTimeSlots
    FOR EACH ROW EXECUTE FUNCTION book();