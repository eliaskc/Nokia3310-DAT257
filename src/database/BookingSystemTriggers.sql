CREATE OR REPLACE FUNCTION book()
    RETURNS trigger as $book$

    
BEGIN

-- lägga in booking
-- få bord
-- sätta isAvailable de tiderna på borden till false 
-- tiderna innan också (-200)


-- behöver få in: email, telenr, namn, antal, datum, starttid, 
RETURN NEW;
END $book$ LANGUAGE plpgsql;


CREATE TRIGGER book INSTEAD OF INSERT OR UPDATE ON 
    AvailableTimeSlots
    FOR EACH ROW EXECUTE FUNCTION book();