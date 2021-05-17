import React,{useState, useEffect, useRef} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DotLoader from 'react-spinners/DotLoader'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService'

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function CalendarFunc(props) {
    let loading = useRef(true)                                          //For when the page is requesing the api
    const [reload, setReload] = useState(false)
    const [dayList, setDayList] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [selectedDate, setSelectedDate] = useState(null)

    //Gets all available days and puts the unavalible one as unavilable
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
        date = moment(date).format('YYYY-MM-DD')
        return !(dayList.includes(date))
    }

    function handleSelect(date){
        props.booking.date = moment(date).format("YYYY-MM-DD")
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
            <h5>OBS! Det går endast att boka tre veckor framåt via appen</h5>
        </div>
    )
}