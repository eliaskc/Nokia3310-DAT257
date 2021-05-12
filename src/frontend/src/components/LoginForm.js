import React,{useState} from 'react'
import BookingDataService from '../api/BookingDataService'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginForm(props){
    const [userPass, setUserPass] = useState('')
    const [passError, setPassError] = useState(false)

    function authenticateUser(){
        BookingDataService.checkPassword(userPass)
            .then(
                (response) => {
                    if (response.data == true){
                        setPassError(false)
                    } else {
                        setPassError(true)
                    }
                }
            )
    }

    return (
        <div className='loginDiv'>
            <Modal show={props.showLoginProp} onHide={() => props.setShowLoginProp(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Personal</Modal.Title>
                </Modal.Header>
                <Modal.Body className='Popup'>
                    <Form>
                        <Form.Label>Lösenord</Form.Label>
                        <Form.Control
                            type='password'
                            name='password'
                            onChange={e => setUserPass(e.target.value)}
                            className={passError ? 'has-error' : null}
                        />
                        <Button variant='primary' onClick={() => authenticateUser()}>
                            Bekräfta
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}