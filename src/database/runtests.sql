--Pretend there 8 seats, 4 tables (2 seats per table)
INSERT INTO Tables VALUES (1, 2);
INSERT INTO Tables VALUES (2, 2);
INSERT INTO Tables VALUES (3, 2);
INSERT INTO Tables VALUES (4, 2);

--Inserting all the allowed booking times for a specific date
--OBS! Remember when trigger is made: if someone is booking 21,
--only this timeslot will be booked, no other timeslots
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '17:00:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '17:30:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '18:00:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '18:30:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '19:00:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '19:30:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '20:00:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '20:30:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '21:00:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '21:30:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '22:00:00');
INSERT INTO BookingTimes VALUES (CURRENT_DATE, '22:30:00');

--Inserting bookings, each booking books 4 timeslots
INSERT INTO Bookings VALUES ('ida', 'ida@live.com', '0761022440', 4, CURRENT_DATE, '17:00:00');
INSERT INTO Bookings VALUES ('ida', 'ida@live.com', '0761022440', 4, CURRENT_DATE, '17:30:00');
INSERT INTO Bookings VALUES ('ida', 'ida@live.com', '0761022440', 4, CURRENT_DATE, '18:00:00');
INSERT INTO Bookings VALUES ('ida', 'ida@live.com', '0761022440', 4, CURRENT_DATE, '18:30:00');

INSERT INTO Bookings VALUES ('lisa', 'lisa@live.com', '0761022442', 2, CURRENT_DATE, '17:30:00');
INSERT INTO Bookings VALUES ('lisa', 'lisa@live.com', '0761022442', 2, CURRENT_DATE, '18:00:00');
INSERT INTO Bookings VALUES ('lisa', 'lisa@live.com', '0761022442', 2, CURRENT_DATE, '18:30:00');
INSERT INTO Bookings VALUES ('lisa', 'lisa@live.com', '0761022442', 2, CURRENT_DATE, '19:00:00');

INSERT INTO Bookings VALUES ('astrid', 'astrid@live.com', '0761022441', 3, CURRENT_DATE, '18:00:00');

--Inserting bookings of the specific tables. When a booking is inserted
--for a specific start time, it also books all the timeslots for those tables
--two hours forward. (If a booking is done 17:00, the next booking can be done
--19:00) Will not need to do this once the trigger is created, since each insert on
--Bookings will trigger this
INSERT INTO BookedTables VALUES (1, CURRENT_DATE, '17:00:00', 'ida@live.com');
INSERT INTO BookedTables VALUES (1, CURRENT_DATE, '17:30:00', 'ida@live.com');
INSERT INTO BookedTables VALUES (1, CURRENT_DATE, '18:00:00', 'ida@live.com');
INSERT INTO BookedTables VALUES (1, CURRENT_DATE, '18:30:00', 'ida@live.com');

INSERT INTO BookedTables VALUES (2, CURRENT_DATE, '17:00:00', 'ida@live.com');
INSERT INTO BookedTables VALUES (2, CURRENT_DATE, '17:30:00', 'ida@live.com');
INSERT INTO BookedTables VALUES (2, CURRENT_DATE, '18:00:00', 'ida@live.com');
INSERT INTO BookedTables VALUES (2, CURRENT_DATE, '18:30:00', 'ida@live.com');


INSERT INTO BookedTables VALUES (4, CURRENT_DATE, '17:30:00', 'lisa@live.com');
INSERT INTO BookedTables VALUES (4, CURRENT_DATE, '18:00:00', 'lisa@live.com');
INSERT INTO BookedTables VALUES (4, CURRENT_DATE, '18:30:00', 'lisa@live.com');
INSERT INTO BookedTables VALUES (4, CURRENT_DATE, '19:00:00', 'lisa@live.com');

--INSERT INTO BookedTables VALUES (1, CURRENT_DATE, '17:30:00', 'lisa@live.com');


INSERT INTO AllTimeSlots VALUES (CURRENT_DATE, '17:00:00', 1, 'bajs@live', 'bajs',  90232, 2);
INSERT INTO AllTimeSlots VALUES (CURRENT_DATE, '21:00:00', 1, 'lol@live', 'lol',  90232, 2);