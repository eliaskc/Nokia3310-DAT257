import React, {useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../api/BookingDataService.js'

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
            <Button>Lägg till en ny bokning</Button>
            <Table responsive>
                <thead>
                    <tr>
                        <th>bokningsId</th>
                        <th>datum</th>
                        <th>antal personer</th>
                        <th>email</th>
                        <th>ändra</th>
                        <th>ta bort</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(
                            booking =>
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{moment(booking.bookingDate).format("YYYY-MM-DD")}</td>
                                    <td>{booking.numberOfPeople}</td>
                                    <td>{booking.email}</td>
                                    <td><Button onClick={() => updateBookingClicked(booking.id)}>update</Button></td>
                                    <td><Button variant="danger" onClick={() => deleteBookingClicked(booking.id)}>ta bort</Button></td>
                                </tr>
                        )
                    }
                </tbody>
            </Table>
            <Button href="/">Hem</Button>
        </div>
        
    )
}

export default BookingListComponent;