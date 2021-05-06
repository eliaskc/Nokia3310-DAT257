import React,{useState, useEffect, useRef} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DotLoader from 'react-spinners/DotLoader'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import BookingDataService from '../../api/BookingDataService'

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function CalendarFunc(props) {
    let loading = useRef(true)
    const [reload, setReload] = useState(false)
    const [dayList, setDayList] = useState([])
    const [disabled, setDisabled] = useState(true)

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
        setDisabled(false)
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
            <div>
                <Link className='prevLink' to={'/guests'}>
                    <Button>
                        Tillbaka
                    </Button>
                </Link>
                <Link className='nextLink' to={'/timelist'}>
                    <Button disabled={disabled}>
                        Nästa
                    </Button>
                </Link> 
            </div>
            
        </div>
    )
}