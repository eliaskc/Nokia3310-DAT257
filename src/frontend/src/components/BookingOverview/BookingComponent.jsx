import React from 'react';

export default function BookingComponent(props) {
    return (
        <tr>
            <td>{props.booking.guestName}</td>
            <td>{props.booking.guestEmail}</td>
            <td>{props.booking.nrOfPeople}</td>
        </tr>
    )
}