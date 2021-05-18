import React,{useState, useEffect} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link, useHistory} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

/**
 * Represents page for selecting guests
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Guests(props) {
    const history = useHistory()
    const [dropdownTitle, setDropDownTitle] = useState('Välj antal gäster');
    let guestsAmount = [1,2,3,4,5,6,7,8];

    //If a value was previously chosen
    useEffect(() => {
        if (props.booking.guests !== 0){
            setDropDownTitle('Antal gäster: ' + props.booking.guests)
        }
    })

    function handleSelect(item){
        //If nr of guests change, reset chosen date
        if (item !== props.booking.guests){
            props.booking.date = ''
        }
        props.booking.guests = item
        setDropDownTitle('Antal gäster: ' + item)
        history.push('/date')
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
            </div>
        </div>
    )
}