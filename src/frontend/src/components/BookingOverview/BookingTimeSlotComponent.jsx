import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import BookingComponent from './BookingComponent.jsx';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function BookingTimeSlotComponent(props) {
    const prevProps = useRef();
    const [bookings, setBookings] = useState([]);
    const [isExpanded, setExpanded] = useState(false);
    const [numberOfBookings, setNumberOfBookings] = useState(refreshNumberOfGuests(props.inputDate, props.inputTime));

    useEffect(() => {
        if (prevProps && !(props === prevProps)) {
            setExpanded(false);
            refreshBookings(props.inputDate, props.inputTime)
            //refreshNumberOfGuests(props.inputDate,props.inputTime);
        }
    }, [props]);

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

    function refreshNumberOfGuests(date, time) {
        date = moment(date).format('YYYY-MM-DD')
        BookingDataService.getNumberOfBookingsByDateAndTime(date, time)
            .then(
                (response) => {
                    setNumberOfBookings(response.data)
                }
            )
    }

    return (
        <tr className={isExpanded ? 'BookingTimeSlotComponent expandedParent' : 'BookingTimeSlotComponent closedParent'}>
            <td>{props.inputTime}</td>
            <td>{numberOfBookings}</td>
            <Button onClick={openClose}>{isExpanded ? 'Stäng' : 'Öppna'}</Button>
            <Table className={isExpanded ? 'expanded' : 'closed'}>
                <thead>
                    <tr>
                        <th>Namn:</th>
                        <th>Epost:</th>
                        <th>Antal bord:</th>
                    </tr>
                </thead>
                <tbody>
                {bookings.map(
                    booking =>
                        <BookingComponent booking={booking} />
                )}
                </tbody>
            </Table>
        </tr>
    )




}

export default BookingTimeSlotComponent;