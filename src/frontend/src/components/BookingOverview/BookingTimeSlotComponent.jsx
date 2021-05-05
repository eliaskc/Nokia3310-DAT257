import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import BookingComponent from './BookingComponent.jsx';

function BookingTimeSlotComponent(props) {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        console.log("InputTime: " + props.inputTime);
        console.log("InputDate: " + props.inputDate);
        refreshBookings(props.inputDate, props.inputTime);
    }, []);

    const refreshBookings = (inputDate, inputTime) => {
        inputDate = moment(inputDate).format('YYYY-MM-DD')

        BookingDataService.getBookingsByDateAndTime(inputDate, inputTime)
            .then(
                (response) => {
                    setBookings(response.data)
                }
            )
    }

    return (
        <tr>
            {
                bookings.map(
                    booking =>
                        <BookingComponent booking={booking}/>
                )
            }
        </tr>
    )


}

export default BookingTimeSlotComponent;