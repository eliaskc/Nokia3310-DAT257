import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import BookingTimeSlotComponent from './BookingTimeSlotComponent.jsx';

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [date] = useState(moment(new Date()).format('YYYY-MM-DD'));

    useEffect(() => {
        refreshTimeSlots(date);
    },[]);

    const refreshTimeSlots = (inputDate) => {
        inputDate = moment(inputDate).format('YYYY-MM-DD')
        BookingDataService.getTimeSlotsByDate(inputDate)
            .then(
                (response) => {
                    setTimeSlots(response.data)
                }
            )
    }

    /*
    const updateBookingClicked = (id) => {
        //TODO
    }

    const deleteBookingClicked = (id) => {
        //TODO
    }
    */

    return (
        <div className="BookingListComponent">
            <Table responsive>
                <thead>
                    <tr>
                        <th>Tid</th>
                        <th>Antal bokningar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        timeSlots.map(
                            timeSlot => 
                                <BookingTimeSlotComponent key={timeSlot} inputTime={timeSlot} inputDate={date}/>
                        )
                    }
                </tbody>
            </Table>
            <Button href="/">Tillbaka</Button>
        </div>

    )
}

export default BookingListComponent;