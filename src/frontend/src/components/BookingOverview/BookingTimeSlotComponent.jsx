import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import BookingComponent from './BookingComponent.jsx';
import Button from 'react-bootstrap/Button';

function BookingTimeSlotComponent(props) {
    const prevProps = useRef();
    const [bookings, setBookings] = useState([]);
    const [isExpanded, setExpanded] = useState(false);
    const [numberOfBookings, setNumberOfBookings] = useState(0);
 
    useEffect(() => {    
        if(prevProps && !(prevProps === props)){
            refreshBookings(props.inputDate, props.inputTime);
            refreshNumberOfGuests(props.inputDate,props.inputTime);
            setExpanded(false);
        }
    },[props]);

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

    function refreshNumberOfGuests(date,time) {
        date = moment(date).format('YYYY-MM-DD')
        BookingDataService.getNumberOfBookingsByDateAndTime(date, time)
            .then(
                (response) => {
                    setNumberOfBookings(response.data)
                }
            )
    }

    return (
        <tr className="BookingTimeSlotComponent">
            <td>{props.inputTime}</td>
            <td>{numberOfBookings}</td>
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