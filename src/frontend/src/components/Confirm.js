import React from 'react'
import Button from 'react-bootstrap/Button'
import BookingDataService from '../api/BookingDataService.js'


/**
 * Represents the confirmation page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Confirm(props) {

    function checkBookingComplete(){
        if (props.booking.name === '' ||
            props.booking.email === '' ||
            props.booking.tel === '' ||
            props.booking.guests === '' ||
            props.booking.date === '' ||
            props.booking.time === '' ||
            props.booking.info === ''){
                return false
        } else {
            return true
        }
    }

    let booking = {
        guestName: props.booking.name,
        guestEmail: props.booking.email,
        guestTelNr: props.booking.tel,
        nrOfPeople: props.booking.guests,
        bookingDate: props.booking.date,
        startTime: props.booking.time,
        additionalInfo: props.booking.info
    }

    function onConfirm(){
        if (!checkBookingComplete()){
            alert('Du måste fylla i all information')
        } else {
            console.log('klart!') 
            console.log(props.booking) 
            console.log(booking)
            BookingDataService.createBooking(booking)

        }
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
            
            <h2 className="confirmGuests">
                Antal gäster: {props.booking.guests.toString()}
            </h2>
            <h2 className="confirmDate">
                Datum: {props.booking.date.toLocaleString('swe', {month: '2-digit', day: '2-digit'})}
            </h2>
            <h2 className="confirmTime">
                Tid: {props.booking.time}
            </h2>
            <h2 className="confirmInfo">
                Övrig info: {props.booking.info}
            </h2>

            <div className='confirm-btn'>
                <Button onClick={onConfirm}>Bekräfta</Button>
            </div>
        </div>
    )
}