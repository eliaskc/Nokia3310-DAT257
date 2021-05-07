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
    const [selectedDate, setSelectedDate] = useState(null)

    useEffect(() => {
        if (props.booking.date !== ''){
            setSelectedDate(new Date(props.booking.date))
            setDisabled(false)
        }
        
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

    function handleSelect(date){
        props.booking.date = date.toLocaleDateString()
        props.booking.time = ''
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
            defaultValue={selectedDate}
            onChange={(value) => handleSelect(value)}>
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