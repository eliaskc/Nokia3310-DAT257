import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'
import BookingDataService from '../../api/BookingDataService.js'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal'
import CreateAndChangeBookingComponent from './CreateAndChangeBookingComponent.jsx';

/**
 * Component which shows all bookings for a specific timeslot, which can then be interacted with
 */
function BookingTimeSlotComponent(props) {
    const tableCapacity = 20;
    const guestCapacity = tableCapacity*2;
    const prevProps = useRef();
    const [bookings, setBookings] = useState([]);
    const [timeSlotIsExpanded, setTimeSlotIsExpanded] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalBooking, setModalBooking] = useState({
        bookingID: 0,
        guestName: "placeholder name",
        guestTelNr: "placeholder tel number",
        nrOfPeople: 0,
        bookingDate: "2020-01-01",
        startTime: "00:00",
        additionalInfo: "placeholder info"
    });
    const [numberOfBookings, setNumberOfBookings] = useState();
    const [numberOfGuests, setNumberOfGuests] = useState();
    const [isChanging, setChanging] = useState(false)

    useEffect(() => {
        if (prevProps && (props !== prevProps)) {
            setTimeSlotIsExpanded(false);
            refreshBookings(props.inputDate, props.inputTime)
            refreshNumberOfBookedTables(props.inputDate, props.inputTime)
            refreshNumberOfGuests(props.inputDate, props.inputTime)
        }
    }, [props]);

    /**
     * Updates the bookings for the given date and time
     * @param {String} inputDate 
     * @param {String} inputTime 
     */
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

    function confirmDelete(bookingID) {
        BookingDataService.deleteBooking(bookingID).then(
            () => {
                window.location.reload();
            });
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setDeleteConfirmation(true);
        if (isChanging)
            setChanging(false)
    }
    const handleShowModal = (booking) => {
        setShowModal(true);
        setModalBooking(booking);
        console.log(booking)
    }

    function refreshNumberOfBookedTables(date, time) {
        date = moment(date).format('YYYY-MM-DD')
        BookingDataService.getNumberOfBookedTablesByDateAndTime(date, time)
            .then(
                (response) => {
                    setNumberOfBookings(response.data)
                }
            )
    }

    function refreshNumberOfGuests(date, time) {
        date = moment(date).format('YYYY-MM-DD')
        BookingDataService.getNumberOfGuestsByDateAndTime(date, time)
            .then(
                (response) => {
                    setNumberOfGuests(response.data)
                }
            )
    }

    return (
        <tr style={timeSlotIsExpanded ? { height: 111 + bookings.length * 49 + 'px' } : { height: 'auto' }} className="BookingTimeSlotComponent">
            <td>{props.inputTime}</td>
            <td>{numberOfGuests} av {guestCapacity}</td>
            <td>{numberOfBookings} av {tableCapacity}</td>
            <td><Button onClick={handleOpenCloseTimeSlot}>{timeSlotIsExpanded ? 'Stäng' : 'Öppna'}</Button></td>
            <Table className={timeSlotIsExpanded ? 'expanded' : 'closed'}>
                <thead>
                    <tr>
                        <th>Namn:</th>
                        <th>Telefonnummer:</th>
                        <th>Antal gäster:</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(
                        booking =>
                            <tr className="booking" onClick={() => handleShowModal(booking)}>
                                <td>{booking.guestName}</td>
                                <td>{booking.guestTelNr}</td>
                                <td>{booking.nrOfPeople}</td>
                            </tr>
                    )}
                </tbody>
            </Table>
            {isChanging ?
                <Modal show={showModal} onHide={() => handleCloseModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ändra bokning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateAndChangeBookingComponent booking={modalBooking} creating={false} />
                    </Modal.Body>
                    <Button variant="primary" onClick={() => setChanging(false)}>
                        Avbryt
                    </Button>
                </Modal> :
                <Modal show={showModal} onHide={() => handleCloseModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Visa bokning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="BookingModal">
                        <div className="top row">
                            <div>
                                <p><b>Antal gäster</b></p>
                                <p>{modalBooking.nrOfPeople}</p>
                            </div>
                            <div>
                                <p><b>Datum</b></p>
                                <p>{modalBooking.bookingDate}</p>
                            </div>
                            <div>
                                <p><b>Tid</b></p>
                                <p>{modalBooking.startTime.slice(0, 5)}</p>
                            </div>
                        </div>

                        <div>
                            <p><b>Namn</b></p>
                            <p>{modalBooking.guestName}</p>
                        </div>
                        <div>
                            <p><b>Telefonnummer</b></p>
                            <p>{modalBooking.guestTelNr}</p>
                        </div>
                        <div>
                            <p><b>Övrig information</b></p>
                            {modalBooking.additionalInfo !== '' ?
                                <p>{modalBooking.additionalInfo}</p>
                                : <p><i>Ingen info angiven</i></p>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setChanging(true)}>
                            Ändra
                        </Button>
                        {deleteConfirmation ? <Button variant="danger" onClick={startDeleteConfirmation}>
                            Ta bort
                        </Button> : <Button variant="danger" onClick={() => confirmDelete(modalBooking.bookingID)}>
                            Är du säker?
                        </Button>}
                    </Modal.Footer>
                </Modal>}
        </tr>
    )




}

export default BookingTimeSlotComponent;