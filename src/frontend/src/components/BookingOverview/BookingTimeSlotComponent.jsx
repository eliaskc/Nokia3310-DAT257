import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import BookingComponent from './BookingComponent.jsx';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal'

function BookingTimeSlotComponent(props) {
    const prevProps = useRef();
    const [bookings, setBookings] = useState([]);
    const [isExpanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    //const [modalBooking, setModalBooking] = useState();
    const [numberOfBookings, setNumberOfBookings] = useState(refreshNumberOfGuests(props.inputDate, props.inputTime));

    useEffect(() => {
        if (prevProps && !(props === prevProps)) {
            setExpanded(false);
            refreshBookings(props.inputDate, props.inputTime)
            //refreshNumberOfGuests(props.inputDate,props.inputTime);
        }
    }, [props]);

    const refreshBookings = (inputDate, inputTime) => {
        inputDate = moment(inputDate).format('YYYY-MM-DD')
        BookingDataService.getBookingsByDateAndTime(inputDate, inputTime)
            .then(
                (response) => {
                    setBookings(response.data)
                }
            )
    }

    function openClose() {
        if (isExpanded)
            setExpanded(false);
        else
            setExpanded(true);
    }

    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = (booking) => {
        setShowModal(true);
        //setModalBooking(booking);
    }

    function refreshNumberOfGuests(date, time) {
        date = moment(date).format('YYYY-MM-DD')
        BookingDataService.getNumberOfBookingsByDateAndTime(date, time)
            .then(
                (response) => {
                    setNumberOfBookings(response.data)
                }
            )
    }

    return (
        <tr className={isExpanded ? 'BookingTimeSlotComponent expandedParent' : 'BookingTimeSlotComponent closedParent'}>
            <td>{props.inputTime}</td>
            <td>{numberOfBookings}</td>
            <Button onClick={openClose}>{isExpanded ? 'Stäng' : 'Öppna'}</Button>
            <Table className={isExpanded ? 'expanded' : 'closed'}>
                <thead>
                    <tr>
                        <th>Namn:</th>
                        <th>Epost:</th>
                        <th>Antal gäster:</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(
                        booking =>
                            <tr className="booking" onClick={handleShowModal(booking)}>
                                <td>{booking.guestName}</td>
                                <td>{booking.guestEmail}</td>
                                <td>{booking.nrOfPeople}</td>
                            </tr>
                    )}
                </tbody>
            </Table>
            {/*<Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{modalBooking.guestName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
            </Button>
                <Button variant="primary" onClick={handleCloseModal}>
                    Save Changes
            </Button>
            </Modal.Footer>
                </Modal>*/}
        </tr>
    )




}

export default BookingTimeSlotComponent;