import React, { useState, useEffect } from 'react';
import {Button, Form } from 'react-bootstrap';
import {useHistory } from 'react-router-dom'

/**
 * Represents page for selecting guests
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function Guests(props) {
    const history = useHistory()
    const [dropdownTitle, setDropDownTitle] = useState('Välj antal gäster');
    let guestsAmount = [1, 2, 3, 4, 5, 6, 7, 8];

    //If a value was previously chosen
    useEffect(() => {
        if (props.booking.guests !== 0) {
            setDropDownTitle('Antal gäster: ' + props.booking.guests)
        }
        console.log("test")
    }, [props.booking.guests]);

    function handleSelect(item) {
        //If nr of guests change, reset chosen date
        if (item !== props.booking.guests) {
            props.booking.date = ''
        }
        console.log(item)
        props.booking.guests = item
        setDropDownTitle('Antal gäster: ' + item)
        history.push('/date')
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Control as="select"
                        name='date'
                        options={guestsAmount}
                        onChange={e => handleSelect(e.target.value)}
                    >
                        <option selected disabled>{dropdownTitle}</option>
                        {guestsAmount.map(n => (
                            <option key={n} value={n}> {n} </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
            <div>
                <Button href='/'>
                    Avbryt
                </Button>
            </div>
            <h5>För bokningar på fler än 8 personer <br/>- kontakta oss!</h5>
        </div>
    )
}