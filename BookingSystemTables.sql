CREATE TABLE Tables (
    tableID INT NOT NULL,
    nrOfSeats INT NOT NULL,
    PRIMARY KEY(tableID),
    CHECK nrOfSeats=2
)