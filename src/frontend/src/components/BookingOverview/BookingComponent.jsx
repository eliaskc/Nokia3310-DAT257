import React from 'react';

export default function BookingComponent(props) {
    return (
        <tr>
            {props.booking.guestName}
            {props.booking.guestEmail}
            {props.booking.nrOfPeople}
        </tr>
    )
}