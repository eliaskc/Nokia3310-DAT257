import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import BookingDataService from '../../api/BookingDataService.js'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment';

/**
 * Represents the page for selecting starttime
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Timelist(props) {
    const history = useHistory()
    const [timelist, setTimelist] = useState([]);
    const [dropdownTitle, setDropDownTitle] = useState('Välj tid');

    //If the date we are trying to get times for is today, input the current time
    //Else we input 00:00:00
    function getDateTime(date) {
        let dateTime = new Date()
        if (date !== moment(dateTime).format('HH:mm:ss')) {
            dateTime.setTime(0, 0, 0, 0)
        }
        return moment(dateTime).format('HH:mm:ss')
    }

    //If you have already choosen time show it, then make so that avalible times are in teh dropbox
    useEffect(() => {
        if (props.booking.time !== '') {
            setDropDownTitle('Tid: ' + props.booking.time)
        }

        BookingDataService.retrieveAllAvailableTimes(props.booking.date, getDateTime(), props.booking.guests)
            .then(
                (response) => {
                    setTimelist(response.data)
                }
            )
    }, [props.booking.time, props.booking.date, props.booking.guests]);

    function handleSelect(item) {
        props.booking.time = item
        setDropDownTitle('Tid: ' + item)
        history.push('/info')
    }

    return (
        <div className="Timelist">
            <Form>
                <Form.Group>
                    <Form.Control as="select"
                        name='date'
                        onChange={e => handleSelect(e.target.value)}
                    >
                        <option selected disabled>{dropdownTitle}</option>
                        {timelist.map(n => (
                            <option key={n} value={n.slice(0, -3)}> {n.slice(0, -3)} </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
            <div>
                <Link className='prevLink' to={'/date'}>
                    <Button>
                        Tillbaka
                    </Button>
                </Link>
            </div>
        </div>
    )
}