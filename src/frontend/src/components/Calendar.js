import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
        props.booking.date = date
    }

    return (
        <div className='calendar'>
            <h2><span>Datum</span></h2>
            <Calendar tileDisabled={tileDisabled} onChange={(value) => displayDate(value)}></Calendar>
        </div>
    )
}