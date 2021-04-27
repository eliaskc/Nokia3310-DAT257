import React from 'react';
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'

//Lägg till detta evt.
//https://react-bootstrap.github.io/components/forms/#forms-validation
export default function AdditionalInfo(props){
    return (
        <div>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Namn</Form.Label>
                    <Form.Control type="text" placeholder="Skriv in namn" onChange={(e) => {props.setName(e.target.value)}}/>
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>E-post</Form.Label>
                    <Form.Control type="email" placeholder="Skriv in e-postaddress" onChange={e => props.setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formTel">
                    <Form.Label>Telefonnummer</Form.Label>
                    <Form.Control type="tel" placeholder="Skriv in telefonnummer" onChange={e => props.setTel(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formText">
                    <Form.Label>Övrig information</Form.Label>
                    <Form.Control type="text" placeholder='Allergier, födelsedag etc.' onChange={e => props.setText(e.target.value)}/>
                </Form.Group>
            </Form>
            <nav>
                <ul>
                    <li> <Link to={props.Prev}>Tillbaka</Link></li>
                    <li> <Link to={props.Next}>Nästa</Link></li>
                </ul>
            </nav>
        </div>
    )
}