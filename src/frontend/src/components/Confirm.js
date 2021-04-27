import React from 'react'
import Button from 'react-bootstrap/Button'

export default function Confirm(props) {

    function onConfirm(){
        console.log('klart!')
    }

    return (
        <div className="Confirm">
            <h2 className="confirmName">
                Namn: {props.booking.name}
            </h2>
            <h2 className="confirmEmail">
                E-post: {props.booking.email}
            </h2>
            <h2 className="confirmTel">
                Telefonnummer: {props.booking.tel}
            </h2>
            <h2 className="confirmInfo">
                Övrig info: {props.booking.info}
            </h2>
            <h2 className="confirmGuests">
                Antal gäster: {props.booking.guests.toString()}
            </h2>
            <h2 className="confirmDate">
                Datum: {props.booking.date.toLocaleString('swe', {month: '2-digit', day: '2-digit'})}
            </h2>
            <h2 className="confirmTime">
                Tid: {props.booking.time}
            </h2>

            <div className='confirm-btn'>
                <Button onClick={onConfirm}>Confirm</Button>
            </div>
        </div>
    )
}