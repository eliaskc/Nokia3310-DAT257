import React,{useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from 'react-bootstrap/Button'

import BookingDataService from '../api/BookingDataService'

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function CalendarFunc(props) {
    let dateDisabled = {}
    let dateList = []
    let start = new Date()
    let end = new Date()
    end.setDate(start.getDate() + 13)
    
    for(let dt = new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        dateList.push(new Date(dt.setHours(0,0,0,0)))
    }

    for (const date of dateList){
        BookingDataService.retrieveAllAvailableTimes(date.toLocaleDateString(), new Date().toLocaleTimeString(), props.booking.guests)
            .then(
                (response) => {
                    if (response.data.length > 0) {
                        dateDisabled[date] = false
                    } else {
                        dateDisabled[date] = true
                    }
                }
            )
    }
    
    function tileDisabled({date}) {
        if (date in dateDisabled) {
            return dateDisabled[date]    
        } else {
            return true
        }
    }

    function displayDate(date){
        console.log(date)
        props.booking.date = date.toLocaleDateString()
    }

    return (
        <div className='calendar'>
            <h2><span>Datum</span></h2>
            <Calendar 
            tileDisabled={tileDisabled} 
            minDate={new Date()} 
            minDetail='month'
            onChange={(value) => displayDate(value)}>
            </Calendar>
        </div>
    )
}