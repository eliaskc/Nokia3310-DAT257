import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal'

function BookingTimeSlotComponent(props) {
    const prevProps = useRef();
    const [bookings, setBookings] = useState([]);
    const [timeSlotIsExpanded, setTimeSlotIsExpanded] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalBooking, setModalBooking] = useState({
        guestName: "placeholder name",
        guestEmail: "placeholder email",
        guestTelNr: "placeholder tel number",
        nrOfPeople: 0,
        bookingDate: "2020-01-01",
        startTime: "00:00",
        additionalInfo: "placeholder info"
    });
    const [numberOfBookings, setNumberOfBookings] = useState(refreshNumberOfGuests(props.inputDate, props.inputTime));

    useEffect(() => {
        if (prevProps && (props !== prevProps)) {
            setTimeSlotIsExpanded(false);
            refreshBookings(props.inputDate, props.inputTime)
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

    function handleOpenCloseTimeSlot() {
        if (timeSlotIsExpanded)
            setTimeSlotIsExpanded(false);
        else
            setTimeSlotIsExpanded(true);
    }

    const startDeleteConfirmation = () => setDeleteConfirmation(false);
    function confirmDelete() {
        console.log("HUR KUNDE DU TA BORT MIGG????");
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setDeleteConfirmation(true);
    }
    const handleShowModal = (booking) => {
        setShowModal(true);
        setModalBooking(booking);
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
        <tr className={timeSlotIsExpanded ? 'BookingTimeSlotComponent expandedParent' : 'BookingTimeSlotComponent closedParent'}>
            <td>{props.inputTime}</td>
            <td>{numberOfBookings}</td>
            <td>
                <Button onClick={handleOpenCloseTimeSlot}>{timeSlotIsExpanded ? 'Stäng' : 'Öppna'}</Button>
            </td>
            <Table className={timeSlotIsExpanded ? 'expanded' : 'closed'}>
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
                            <tr className="booking" onClick={() => handleShowModal(booking)}>
                                <td>{booking.guestName}</td>
                                <td>{booking.guestEmail}</td>
                                <td>{booking.nrOfPeople}</td>
                            </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalBooking.bookingDate + ", " + modalBooking.startTime.slice(0, 5)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Namn: </b>{modalBooking.guestName}</p>
                    <p><b>Epost: </b> {modalBooking.guestEmail}</p>
                    <p><b>Telefonnummer: </b>{modalBooking.guestTelNr}</p>
                    <p><b>Antal gäster: </b>{modalBooking.nrOfPeople}</p>
                    {modalBooking.additionalInfo != null ?
                        <p><b>Övrig info: </b>{modalBooking.additionalInfo}</p>
                        : <p><b>Övrig info: </b>Ingen info angiven</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" >
                        Ändra
                    </Button>
                    {deleteConfirmation ? <Button variant="danger" onClick={startDeleteConfirmation}>
                        Ta bort
                    </Button> : <Button variant="danger" onClick={confirmDelete}>
                        Är du säker?
                    </Button>}
                </Modal.Footer>
            </Modal>
        </tr>
    )




}

export default BookingTimeSlotComponent;