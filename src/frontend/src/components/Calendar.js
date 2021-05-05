import React,{useState, useEffect, useRef} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DotLoader from 'react-spinners/DotLoader'
import Button from 'react-bootstrap/Button'

import BookingDataService from '../api/BookingDataService'

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function CalendarFunc(props) {
    let loading = useRef(true)
    const [reload, setReload] = useState(false)
    const [dayList, setDayList] = useState([])

    useEffect(() => {
        BookingDataService.retrieveAllAvailableDays(props.booking.guests)
            .then(
                (response) => {
                    setDayList(response.data)
                    loading.current = false
                    setReload(true)
                }
            )
    }, [])

    function tileDisabled({date}) {
        if (dayList.includes(date.toLocaleDateString())){
            return false
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
            <h2><span>Välj datum</span></h2>
            {loading.current ? 
            <DotLoader color={'#FFFFFF'}/>
            :
            <Calendar
            tileDisabled={tileDisabled}
            minDate={new Date()}
            minDetail='month'
            onChange={(value) => displayDate(value)}>
            </Calendar>
            }
        </div>
    )
}