import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function calendar(props) {
    let today = new Date()
    today.setHours(0,0,0,0)

    function tileDisabled({date}) {
        date.setHours(0,0,0,0)

        //If the date is before today, disable date
        return (date < today);
    }

    function displayDate(date){
        console.log(date)
        props.booking.date = date.toLocaleDateString()
    }

    return (
        <div className='calendar'>
            <h2><span>Datum</span></h2>
            <Calendar tileDisabled={tileDisabled} onChange={(value) => displayDate(value)}></Calendar>
        </div>
    )
}