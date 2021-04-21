
\set QUIET true
SET client_min_messages TO WARNING; -- Less talk please.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
\set QUIET false


--Pretend there 8 seats, 4 tables (2 seats per table)
INSERT INTO Tables VALUES (1, 2);
INSERT INTO Tables VALUES (2, 2);
INSERT INTO Tables VALUES (3, 2);
INSERT INTO Tables VALUES (4, 2);

