import React,{useState, useEffect} from 'react';
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
    const [disabled, setDisabled] = useState(true)
    //The amount of guests that you are able to choose
    let guestsAmount = [1,2,3,4,5,6,7,8];

    //If a value was previously chosen
    useEffect(() => {
        if (props.booking.guests !== 0){
            setDropDownTitle('Antal gäster: ' + props.booking.guests)
            setDisabled(false)
        }
    })

    function handleSelect(item){
        props.booking.guests = item
        //If nr of guests change, reset chosen date
        props.booking.date = ''
        setDropDownTitle('Antal gäster: ' + item)
        setDisabled(false)
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
                    <Button disabled={disabled}>
                        Nästa
                    </Button>
                </Link> 
            </div>
        </div>
    )
}