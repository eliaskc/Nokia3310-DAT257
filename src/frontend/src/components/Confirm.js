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
            props.booking.time === ''){
                return false
        } else {
            return true
        }
    }

    function onConfirm(){
        if (!checkBookingComplete()){
            alert('Du måste fylla i all information')
        } else {
            console.log('klart!') 
            console.log(props.booking) 
            BookingDataService.createBooking(props.booking)

        }
    }

    return (
        <div className="Confirm">
            <h2>Översikt</h2>

            <h3 className="confirmName">
                Namn: {props.booking.name}
            </h3>
            <h3 className="confirmEmail">
                E-post: {props.booking.email}
            </h3>
            <h3 className="confirmTel">
                Telefonnummer: {props.booking.tel}
            </h3>
            
            <h3 className="confirmGuests">
                Antal gäster: {props.booking.guests.toString()}
            </h3>
            <h3 className="confirmDate">
                Datum: {props.booking.date.toLocaleString('swe', {month: '2-digit', day: '2-digit'})}
            </h3>
            <h3 className="confirmTime">
                Tid: {props.booking.time}
            </h3>
            <h3 className="confirmInfo">
                Övrig info: {props.booking.info}
            </h3>

            <div className='confirm-btn'>
                <Button onClick={onConfirm}>Bekräfta</Button>
            </div>
        </div>
    )
}