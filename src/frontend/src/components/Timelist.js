import React,{useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

/**
 * Represents the page for selecting time
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Timelist(props) {
    const [dropdownTitle, setDropDownTitle] = useState('Välj tid');

    //example of times, will be populated with times from backend
    const times = ['17:00',
                   '17:30',
                   '18:00',
                   '18:30',
                   '19:00',
                   '19:30',
                   '20:00',
                   '20:30',
                   '21:00']

    function handleSelect(item){
        console.log(item)
        props.booking.time = item
        setDropDownTitle('Tid: ' + item)
    }

    return (
        <div>
            <h2><span>Tid</span></h2>
            <DropdownButton title={dropdownTitle} id="dropdown-menu" onSelect={handleSelect}>
                {times.map(n => (
                    <Dropdown.Item key={n.toString()} eventKey={n}> {n} </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    )
}