import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import BookingComponent from './BookingComponent.jsx';

function BookingTimeSlotComponent(props) {
    const [bookings, setBookings] = useState([]);
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [time, setTime] = useState(moment(new Date()).format('HH:00:00'));

    useEffect(() => {
        setTime(props.inputTime);
        setDate(props.inputDate);
        console.log("Time: " + time);
        console.log("Date: " + date);
        refreshBookings(date, time);
    }, []);

    const refreshBookings = (inputDate, inputTime) => {
        inputDate = moment(inputDate).format('YYYY-MM-DD')

        BookingDataService.getBookingsByDateAndTime(inputDate, inputTime)
            .then(
                (response) => {
                    console.log("Time2: " + time);
                    console.log("Date2: " + date);
                    setBookings(response.data)
                    console.log("Bookings: " + bookings);
                    console.log("Response: " + response.data);
                }
            )
    }

    return (
        <tr>
            {
                bookings.map(
                    booking =>
                        <BookingComponent booking={booking} />
                )
            }
        </tr>
    )


}

export default BookingTimeSlotComponent;