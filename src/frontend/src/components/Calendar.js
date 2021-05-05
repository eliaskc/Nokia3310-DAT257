import React,{useState, useEffect,} from 'react';
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
    console.log('Start')

    const [go, setGo] = useState(false)

    let disabledDate = {}
    let dateList = []

    let today = new Date()
    let start = new Date()
    let end = new Date()

    console.log(disabledDate)
    start.setDate(today.getDate() + 1)
    end.setDate(today.getDate() + 13)
    dateList.push(today)
    for(let dt = new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        dateList.push(new Date(dt.setHours(0,0,0,0)))
    }

    for (const date of dateList){
        BookingDataService.retrieveAllAvailableTimes(date.toLocaleDateString(), new Date().toLocaleTimeString(), props.booking.guests)
            .then(
                (response) => {
                    if (response.data.length > 0) {
                        disabledDate[date] = false
                    } else {
                        disabledDate[date] = true
                    }
                }
            )
    }

    function walla(){
        setGo(true)
    }
    
    function tileDisabled({date}) {
        console.log('HERE NW')
        if (date in disabledDate) {
            return disabledDate[date]    
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
            {go ? <Calendar
            tileDisabled={tileDisabled}
            minDate={new Date()}
            minDetail='month'
            onChange={(value) => displayDate(value)}>
            </Calendar>: null}
            <Button onClick={() => walla()}>WALALAAA</Button>
        </div>
    )
}