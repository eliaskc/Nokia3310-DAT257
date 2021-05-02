import React from 'react';
import Form from 'react-bootstrap/Form'

//Lägg till detta evt.
//https://react-bootstrap.github.io/components/forms/#forms-validation
/**
 * Represents the page for inputting information
 * @param {*} props Object that represents the current booking
 * @returns 
 */
export default function AdditionalInfo(props){
    function handleChange(event){
        props.booking[event.target.id] = event.target.value
    }

    return (
        <div className="AdditionalInfo">
            <Form onChange={e => handleChange(e)}>
                <Form.Group controlId="name">
                    <Form.Label>Namn</Form.Label>
                    <Form.Control defaultValue={props.booking.name} type="text" placeholder="Skriv in namn"/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>E-post</Form.Label>
                    <Form.Control defaultValue={props.booking.email} type="email" placeholder="Skriv in e-postaddress"/>
                </Form.Group>
                <Form.Group controlId="tel">
                    <Form.Label>Telefonnummer</Form.Label>
                    <Form.Control defaultValue={props.booking.tel} type="tel" placeholder="Skriv in telefonnummer"/>
                </Form.Group>
                <Form.Group controlId="info">
                    <Form.Label>Övrig information</Form.Label>
                    <Form.Control defaultValue={props.booking.info} as='textarea' type="text" placeholder='Allergier, födelsedag etc.'/>
                </Form.Group>
            </Form>
        </div>
    )
}