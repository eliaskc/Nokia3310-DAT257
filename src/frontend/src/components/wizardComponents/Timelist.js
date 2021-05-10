import React,{useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BookingDataService from '../../api/BookingDataService.js'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

/**
 * Represents the page for selecting time
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Timelist(props) {
    const [timelist, setTimelist] = useState([]);
    const [dropdownTitle, setDropDownTitle] = useState('Välj tid');
    const [disabled, setDisabled] = useState(true)

    //If the date we are trying to get times for is today, input the current time
    //Else we input 00:00:00
    function getDateTime(){
        let dateTime = new Date()
        if (props.booking.date !== dateTime.toLocaleDateString()){
            dateTime.setTime(0,0,0,0)
        }
        return dateTime.toLocaleTimeString()
    }

    useEffect(() => {
        if (props.booking.time !== ''){
            setDropDownTitle('Tid: ' + props.booking.time)
            setDisabled(false)
        }

        BookingDataService.retrieveAllAvailableTimes(props.booking.date, getDateTime(), props.booking.guests)
            .then(
                (response) => {
                    setTimelist(response.data)
                }
            )
    });

    function handleSelect(item){
        props.booking.time = item
        setDropDownTitle('Tid: ' + item)
        setDisabled(false)
    }

    return (
        <div className="Timelist">
            <DropdownButton title={dropdownTitle} id="dropdown-menu" onSelect={handleSelect}>
                {timelist.map(n => (
                    <Dropdown.Item key={n.toString()} eventKey={n.slice(0,-3)}> {n.slice(0,-3)} </Dropdown.Item>
                ))}
            </DropdownButton>
            <div>
                <Link className='prevLink' to={'/date'}>
                    <Button>
                        Tillbaka
                    </Button>
                </Link>
                <Link className='nextLink' to={'/info'}>
                    <Button disabled={disabled}>
                        Nästa
                    </Button>
                </Link> 
            </div>
        </div>
    )
}