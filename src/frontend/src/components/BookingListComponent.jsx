import React, {useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../api/BookingDataService.js'

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [bookings,setBookings] = useState([]);

    useEffect(() => {
        refreshBokings();
      }, []);

    const refreshBokings = () => {
        BookingDataService.retrieveAllBookings()
        .then(
            (response) => {
                setBookings(response.data)
            }
        )
    }

    const updateBookingClicked = (id) =>{
        //TODO
    }

    const deleteBookingClicked = (id) =>{
       //TODO
    }

    return (
        <div className="BookingListComponent">
            <Button>Lägg till bokning</Button>
            <Table responsive>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Datum</th>
                        <th>Antal personer</th>
                        <th>Email</th>
                        <th>Ändra</th>
                        <th>Ta bort</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(
                            booking =>
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{moment(booking.bookingDate).format("YYYY-MM-DD")}</td>
                                    <td>{booking.nrOfPeople}</td>
                                    <td>{booking.guestEmail}</td>
                                    <td><Button onClick={() => updateBookingClicked(booking.id)}>Uppdatera</Button></td>
                                    <td><Button variant="danger" onClick={() => deleteBookingClicked(booking.id)}>Ta bort</Button></td>
                                </tr>
                        )
                    }
                </tbody>
            </Table>
            <Button href="/">Tillbaka</Button>
        </div>
        
    )
}

export default BookingListComponent;