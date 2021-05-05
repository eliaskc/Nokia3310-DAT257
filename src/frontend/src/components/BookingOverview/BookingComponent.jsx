import React from 'react';

export default function BookingComponent(props) {
    return (
        <div>
            <p><b>Namn: </b> {props.booking.guestName}</p>
            <p><b>Epost: </b> {props.booking.guestEmail}</p>
            <p><b>Antal gäster: </b>{props.booking.nrOfPeople}</p>
        </div>

    )
}