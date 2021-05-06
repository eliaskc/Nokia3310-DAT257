import React,{useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

/**
 * Represents page for selecting guests
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Guests(props) {
    const [dropdownTitle, setDropDownTitle] = useState('Välj antal gäster');

    let guestsAmount = [1,2,3,4,5,6,7,8];

    function handleSelect(item){
        console.log(item)
        props.booking.guests = item
        setDropDownTitle('Antal gäster: ' + item)
    }
    
    return (
        <div>
            <DropdownButton title={dropdownTitle} id="dropdown-menu" onSelect={handleSelect}>
                {guestsAmount.map(n => (
                    <Dropdown.Item key={n.toString()} eventKey={n}> {n} </Dropdown.Item>
                ))}
            </DropdownButton>
            <div>
                <Button href='/'>
                    Avbryt
                </Button>
                <Link className='nextLink' to={'/date'}>
                    <Button>
                        Nästa
                    </Button>
                </Link> 
            </div>
        </div>
    )
}