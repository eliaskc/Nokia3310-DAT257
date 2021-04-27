import React from 'react';
import Form from 'react-bootstrap/Form'

//Lägg till detta evt.
//https://react-bootstrap.github.io/components/forms/#forms-validation
export default function AdditionalInfo(props){
    return (
        <div>
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Namn</Form.Label>
                    <Form.Control type="email" placeholder="Skriv in namn" />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>E-post</Form.Label>
                    <Form.Control type="email" placeholder="Skriv in e-postaddress" />
                </Form.Group>
                <Form.Group controlId="formTel">
                    <Form.Label>Telefonnummer</Form.Label>
                    <Form.Control type="tel" placeholder="Skriv in telefonnummer" />
                </Form.Group>
                <Form.Group controlId="formText">
                    <Form.Label>Övrig information</Form.Label>
                    <Form.Control type="text" placeholder='Allergier, födelsedag etc.'/>
                </Form.Group>
            </Form>
        </div>
    )
}