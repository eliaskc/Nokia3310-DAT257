import React, { useState } from 'react';
import moment from 'moment'

export default function BookingComponent(props) {
    const [booking, setBooking] = useState([]);

    return (
        <tr>
            <td>{props.booking.guestName}</td>
            <td>{props.booking.guestEmail}</td>
            <td>{props.booking.nrOfGuests}</td>
            <td>{props.booking.additionalInfo}</td>
            <td>{moment(props.booking.bookingDate).format("YYYY-MM-DD")}</td>
            <td>{props.booking.startTime}</td>
        </tr>
    )
};