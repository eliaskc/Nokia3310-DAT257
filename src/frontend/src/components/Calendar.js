import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function calendar(props) {
    let today = new Date()
    today.setHours(0,0,0,0)

    function tileDisabled({date}) {
        date.setHours(0,0,0,0)
        return (date < today);
    }

    return (
        <div className='calendar'>
            <h2><span>Pick a date</span></h2>
            <Calendar tileDisabled={tileDisabled} onChange={(value) => props.dateProps(value)}></Calendar>
        </div>
    )
}