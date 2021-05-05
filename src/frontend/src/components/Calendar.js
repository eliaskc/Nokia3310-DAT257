import React,{useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import BookingDataService from '../api/BookingDataService'

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function CalendarFunc(props) {
    const [timelist, setTimeList] = useState()

    function tileDisabled({date}) {
        //Lägg till kod som kallar på backenden och returnerar 'true' om det inte finns någon ledig tid för dagen 'date'
        //Använd date.setHours(0,0,0,0)
        //Använd date.toLocaleDateString() för datumet
        //Använd date.toLocaleTimeString() för tiden

        let dateTime = new Date()

        if (date.toLocaleDateString() !== dateTime.toLocaleDateString()){
            dateTime.setTime(0,0,0,0)
        }
        dateTime.toLocaleTimeString()

        BookingDataService.retrieveAllAvailableTimes(date.toLocaleDateString(), new Date().toLocaleTimeString(), props.booking.guests)
        .then(
            (response) => {
                setTimeList(reponse.data)
            }
        )

        if (timelist.length === 0){
            return true
        } else {
            return false
        }

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