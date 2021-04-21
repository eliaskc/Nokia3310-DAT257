
\set QUIET true
SET client_min_messages TO WARNING; -- Less talk please.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
\set QUIET false

 \i /users/idalinnakallio/documents/GitHub/Nokia3310-DAT257/src/database/BookingSystemTables.sql
 \i /users/idalinnakallio/documents/GitHub/Nokia3310-DAT257/src/database/BookingSystemViews.sql