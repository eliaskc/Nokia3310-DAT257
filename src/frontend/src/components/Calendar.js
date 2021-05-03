import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function calendar(props) {
    function tileDisabled({date}) {
        //Lägg till kod som kallar på backenden och returnerar 'true' om det inte finns någon ledig tid för dagen 'date'
        //Använd date.setHours(0,0,0,0)
        //Använd date.toLocaleDateString() för datumet
        //Använd date.toLocaleTimeString() för tiden
    }

    function displayDate(date){
        console.log(date)
        props.booking.date = date.toLocaleDateString()
    }

    return (
        <div className='calendar'>
            <h2><span>Datum</span></h2>
            <Calendar tileDisabled={tileDisabled} minDate={new Date()} onChange={(value) => displayDate(value)}></Calendar>
        </div>
    )
}