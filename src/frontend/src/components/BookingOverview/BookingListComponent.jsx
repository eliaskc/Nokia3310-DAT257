import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import BookingDataService from '../../api/BookingDataService.js'
import BookingTimeSlotComponent from './BookingTimeSlotComponent.jsx';
import CreateAndChangeBookingComponent from './CreateAndChangeBookingComponent.jsx';
import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'
import UserAuth from '../UserAuth.js'

/**
 * Component that shows a list of bookings for a specific date, which can be changed
 */
function BookingListComponent() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [closeDayConfirmation, setCloseDayConfirmation] = useState(true);
    const [openDayConfirmation, setOpenDayConfirmation] = useState(true);
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

    /**
     * Updates the timeslots for the specified date
     * @param {String} inputDate 
     */
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
    
    const startCloseDayConfirmation = () => setCloseDayConfirmation(false);
    const startOpenDayConfirmation = () => setOpenDayConfirmation(false);

    function confirmCloseDay(bookingDate) {
        bookingDate = moment(bookingDate).format('YYYY-MM-DD')

        BookingDataService.getTimeSlotsByDate(bookingDate).then(response => {
            if(response.data.length !== 0) {
                BookingDataService.getBookingsByDate(bookingDate).then(response => {
                    if (response.data.length === 0){
                        BookingDataService.deleteBookingTimes(bookingDate).then(
                            () => {
                                window.location.reload();
                            });
                    } else {
                        alert("Det finns bokningar inlagda för denna dag. Ta bort bokningarna innan du stänger av dagen.")
                        window.location.reload();
                    }
                })
            } else {
                alert("Denna dag är redan stängd.")
                window.location.reload();
            }
        })


    }

    function confirmOpenDay(bookingDate) {
        bookingDate = moment(bookingDate).format('YYYY-MM-DD')

        BookingDataService.getTimeSlotsByDate(bookingDate).then(response => {
            if (response.data.length === 0){
                BookingDataService.addBookingTimes(bookingDate).then(
                    () => {
                        window.location.reload();
                    });
                } else {
                    alert("Denna dag är redan öppen.")
                    window.location.reload();
                }
        })
    }


    function onPreviousDate() {
        let prevDate = new Date(date)
        prevDate.setDate(prevDate.getDate() - 1)
        changeDate(moment(prevDate).format('YYYY-MM-DD'))
        setCloseDayConfirmation(true)
        setOpenDayConfirmation(true)
    }

    function onNextDate() {
        let nextDate = new Date(date)
        nextDate.setDate(nextDate.getDate() + 1)
        changeDate(moment(nextDate).format('YYYY-MM-DD'))
        setCloseDayConfirmation(true)
        setOpenDayConfirmation(true)
    }

    const changeDate = (newDate) => {
        refreshTimeSlots(newDate);
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
                    <div className="header">
                        <Button href="/">Tillbaka</Button>
                        <Button variant="danger" onClick={() => logOut()}>Logga ut</Button>

                        <Formik
                            initialValues={{ date: date }}
                            enableReinitialize={true}>
                            {
                                () => (
                                    <Form>
                                        <fieldset className="form-group date-selection">
                                            <Button className='prev-date-btn' onClick={() => onPreviousDate()}> ❮ </Button>
                                            <Field className="form-control"
                                                type="date"
                                                name="date"
                                                value={date}
                                                onChange={e => changeDate(e.target.value)} />
                                            <Button className='next-date-btn' onClick={() => onNextDate()}> ❯ </Button>
                                        </fieldset>
                                    </Form>
                                )
                            }
                        </Formik>
                        <Button variant="primary" className="btn btn-success" onClick={() => handleShowCreateModal()}>Skapa ny bokning</Button>
                    </div>

                    <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Skapa ny bokning</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreateAndChangeBookingComponent booking={modalBooking} />
                        </Modal.Body>
                    </Modal>
                    <h2>Visar bokningar för: {date}</h2>
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
                </div>}

                <div className="BookingListButtons">
                    {closeDayConfirmation ? <Button variant="danger" onClick={startCloseDayConfirmation}>
                        Stäng dag
                    </Button> : <Button variant="danger" onClick={() => confirmCloseDay(date)}>
                        Är du säker på att du vill stänga av bokningar för denna dag?
                    </Button>}
                    
                    {openDayConfirmation ? <Button variant="primary" onClick={startOpenDayConfirmation}>
                        Öppna dag
                    </Button> : <Button variant="primary" onClick={() => confirmOpenDay(date)}>
                        Är du säker på att du vill öppna bokningar för denna dag?
                    </Button>}
                </div>

            {loading && !isAuthenticated &&
                <div className='bookingListRoot'>
                    <DotLoader size='100px' />
                </div>}

            {!loading && !isAuthenticated &&
                <Redirect to='/' />}
        </div >
    )
}

export default BookingListComponent;