import React,{useState} from 'react'
import UserAuth from './UserAuth'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom'

export default function LoginForm(props){
    const history = useHistory()
    const [userPass, setUserPass] = useState('')
    const [passError, setPassError] = useState(false)

    function authenticate(){
        UserAuth.authenticateUser(userPass).then((authenticated) => {
            if (authenticated){
                history.push('/bookings')
                history.go()
            } else {
                setPassError(true)
            }
        })
    }

    function onKeyUp(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            setUserPass(event.target.value)
            authenticate()
        }
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
                            onKeyPress={e => onKeyUp(e)}
                            className={passError ? 'has-error' : null}
                        />
                        <Button variant='primary' onClick={() => authenticate()}>
                            Bekräfta
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}