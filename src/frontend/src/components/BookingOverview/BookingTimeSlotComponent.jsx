import React, { useState, useEffect } from 'react';
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import BookingComponent from './BookingComponent.jsx';
import Button from 'react-bootstrap/Button';

function BookingTimeSlotComponent(props) {
    const [bookings, setBookings] = useState([]);
    const [isExpanded, setExpanded] = useState(false);

    useEffect(() => {
        refreshBookings(props.inputDate, props.inputTime);
    });

    const refreshBookings = (inputDate, inputTime) => {
        inputDate = moment(inputDate).format('YYYY-MM-DD')

        BookingDataService.getBookingsByDateAndTime(inputDate, inputTime)
            .then(
                (response) => {
                    setBookings(response.data)
                }
            )
    }

    function openClose() {
        if (isExpanded)
            setExpanded(false);
        else
            setExpanded(true);
    }

    return (
        <tr className="BookingTimeSlotComponent">
            <td>{props.inputTime}</td>
            <td>{bookings.length}</td> {/* Should show the number of booked guests/tables */}
            <Button onClick={openClose}>{isExpanded ? 'Stäng' : 'Öppna'}</Button>

            <div className={isExpanded ? 'expanded' : 'closed'}>{
                bookings.map(
                    booking =>
                        <BookingComponent booking={booking} />
                )
            }</div>
        </tr>
    )




}

export default BookingTimeSlotComponent;