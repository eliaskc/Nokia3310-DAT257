import React,{useState, useEffect, useRef} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DotLoader from 'react-spinners/DotLoader'
import {Link, useHistory} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService'

/**
 * Represents the calendar page
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function CalendarFunc(props) {
    const history = useHistory()
    let loading = useRef(true)                                          //For when the page is requesing the api
    const [reload, setReload] = useState(false)
    const [dayList, setDayList] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)

    //Gets all available days and puts the unavalible one as unavilable
    useEffect(() => {
        if (props.booking.date !== ''){
            setSelectedDate(new Date(props.booking.date))
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
        //If date changes, reset chosen time
        if (moment(date).format("YYYY-MM-DD") !== props.booking.date){
            props.booking.time = ''
        }
        props.booking.date = moment(date).format("YYYY-MM-DD")
        history.push('/timelist')
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
            </div>
            <h5>OBS! Det går endast att boka fyra veckor framåt via appen</h5>
        </div>
    )
}