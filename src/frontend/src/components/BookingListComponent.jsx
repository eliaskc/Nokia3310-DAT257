import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import {Formik,Form, Field,ErrorMessage} from 'formik'
import BookingDataService from '../api/BookingDataService.js'
import BookingComponent from './BookingComponent.jsx';

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        refreshBookings();
    }, []);

    const refreshBookings = () => {
        BookingDataService.retrieveAllBookings()
            .then(
                (response) => {
                    setBookings(response.data)
                }
            )
    }

    const updateBookingClicked = (id) => {
        //TODO
    }

    const deleteBookingClicked = (id) => {
        //TODO
    }

    return (

        <div className="BookingListComponent">
            <Table responsive>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th>Datum</th>
                        <th>Tid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(
                            booking => 
                                <BookingComponent booking={booking}/>
                        )
                    }
                </tbody>
            </Table>
            <Button href="/">Tillbaka</Button>
        </div>

    )
}

export default BookingListComponent;