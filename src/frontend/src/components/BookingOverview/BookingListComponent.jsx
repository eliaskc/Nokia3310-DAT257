import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import BookingDataService from '../../api/BookingDataService.js'
import BookingTimeSlotComponent from './BookingTimeSlotComponent.jsx';
import CreateBookingComponent from './CreateBookingComponent.jsx';
import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'
import UserAuth from '../UserAuth.js'

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [showCreateModal, setShowCreateModal] = useState(false);
    let modalBooking = {
        bookingID: 0,
        guestName: "",
        guestTelNr: "",
        nrOfPeople: "",
        bookingDate: "",
        startTime: "",
        additionalInfo: ""
    };
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        UserAuth.isUserAuthenticated().then((authenticated) => {
            setIsAuthenticated(authenticated)
            setLoading(false)
        })

        refreshTimeSlots(date);
    }, [date]);

    const refreshTimeSlots = (inputDate) => {
        inputDate = moment(inputDate).format('YYYY-MM-DD');
        BookingDataService.getTimeSlotsByDate(inputDate)
            .then(
                (response) => {
                    setTimeSlots(response.data);
                    setDate(inputDate)
                }
            );
    }

    function logOut() {
        UserAuth.logOutUser()
        setIsAuthenticated(false)
    }

    const submitDate = (values) => {
        refreshTimeSlots(values.date);
    }

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    }
    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    }


    return (
        <div>
            {isAuthenticated && !loading &&
                <div className="BookingListComponent">
                    <div>
                        <Button onClick={() => logOut()}>
                            Logga ut
                        </Button>
                        <div>
                            <Formik
                                initialValues={{ date: date }}
                                onSubmit={submitDate}
                                enableReinitialize={true}
                            >
                                {
                                    () => (
                                        <Form>
                                            <Button href="/">Tillbaka</Button>
                                            <fieldset className="form-group">
                                                Välj datum:
                                                <Field className="form-control" type="date" name="date" />
                                            </fieldset>
                                            <Button variant="primary" className="btn btn-success" type="submit" >Ändra datum</Button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <Button variant="primary" className="btn btn-success" onClick={() => handleShowCreateModal()}>Skapa bokning</Button>
                            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Skapa bokning</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <CreateBookingComponent booking={modalBooking} />
                                </Modal.Body>
                            </Modal>
                            <h2>Visar bokningar för: {date}</h2>
                        </div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Tid</th>
                                    <th>Antal inbokade gäster</th>
                                    <th>Antal bokade bord</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    timeSlots.map(
                                        timeSlot =>
                                            <BookingTimeSlotComponent key={timeSlot} inputTime={timeSlot} inputDate={date} />
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                    
                    {loading && !isAuthenticated &&
                        <div className='bookingListRoot'>
                            <DotLoader size='100px' />
                        </div>}

                    {!loading && !isAuthenticated &&
                        <Redirect to='/' />}
                </div>
                    </div>
            )
}

            export default BookingListComponent;