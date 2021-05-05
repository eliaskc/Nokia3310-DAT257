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
    let maxDayAllowed = new Date()
    let minDayAllowed = new Date()
    today.setHours(0,0,0,0)
    maxDayAllowed.setDate(today.getDate() + 21)
    minDayAllowed.setDate(today.getDate()-3)

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
            <h2><span>Välj datum</span></h2>
            <Calendar tileDisabled={tileDisabled} 
                onChange={(value) => displayDate(value)}
                maxDate={maxDayAllowed}
                minDate={minDayAllowed}
                minDetail={"month"}
                nextLabel={""}
                next2Label={""}
                prevLabel={""}
                prev2Label={""}
            ></Calendar>

            <h5>OBS! Det går endast att boka tre veckor framåt via appen</h5>
        </div>
    )
}