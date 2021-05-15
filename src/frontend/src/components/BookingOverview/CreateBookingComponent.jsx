import React, { useState, useEffect } from 'react';
import BookingDataService from '../../api/BookingDataService.js'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Col } from 'react-bootstrap'
import moment from 'moment';



export default function CreateBookingComponent(props) {
    /**
     * Javascript object created with the values of props, in order for the backend to be able to handle it
     */
    let booking = {
        guestName: '',
        guestTelNr: '',
        nrOfPeople: 0,
        bookingDate: '',
        startTime: '',
        additionalInfo: ''
    };
    const [dateDisabled, setDateDisabled] = useState(true);
    const [timeDisabled, setTimeDisabled] = useState(true);
    const [dayList, setDayList] = useState([])
    const [timeList, setTimeList] = useState([])

    useEffect(() => {
        if (props.booking.nrOfPeople > 0) {
            setDateDisabled(false)
            setTimeDisabled(false)
            fetchAvailableDays(props.booking.nrOfPeople)
            fetchAvailableTimes(props.booking.bookingDate)
        }
    }, []);

    function submitBooking() {
        if (!checkBookingComplete)
            alert('Det saknas information')
        else if (props.creating === true) {
            BookingDataService.createBooking(booking).then(() => {
                //handleCloseModal();
                window.location.reload();
            }
            ).catch(error => {
                alert('Någonting gick fel. Försök igen senare.')
            })
        } else {
            BookingDataService.updateBooking(props.booking.bookingID, booking).then(() => {
                //handleCloseModal();
                window.location.reload();
            }
            ).catch(error => {
                alert('Någonting gick fel. Försök igen senare.')
            })
        }
    }

    function checkBookingComplete() {
        return !(
            booking.guestName === '' ||
            booking.guestTelNr === '' ||
            booking.nrOfPeople === 0 ||
            booking.bookingDate === '' ||
            booking.startTime === ''
        )
    };

    function saveValues(values) {
        booking.guestName = values.name
        booking.guestTelNr = values.tel
        booking.nrOfPeople = values.guests
        booking.bookingDate = values.date
        booking.startTime = values.time
        booking.additionalInfo = values.info

    }

    //If the date we are trying to get times for is today, input the current time
    //Else we input 00:00:00
    function getDateTime(date) {
        let dateTime = new Date()
        if (date !== moment(dateTime).format('HH:mm:00')) {
            dateTime.setTime(0, 0, 0, 0)
        }
        return moment(dateTime).format('HH:mm:00')
    }

    function fetchAvailableDays(guests) {
        BookingDataService.retrieveAllAvailableDays(guests)
            .then(
                (response) => {
                    setDayList(response.data);
                }
            )
    }

    function fetchAvailableTimes(date) {
        BookingDataService.retrieveAllAvailableTimes(date, getDateTime(date), booking.nrOfPeople)
            .then(
                (response) => {
                    setTimeList(response.data);
                }
            )
    }

    function guestsChange(handleChange, event) {
        booking.guests = event.target.value;
        if (event.target.value !== '') {
            
            if (event.target.value < 0) {
                event.target.value = ''
            } else {
                if (dateDisabled === true)
                    setDateDisabled(false);
                fetchAvailableDays(event.target.value);
            }
        }
        handleChange(event);
    }

    function dateChange(handleChange, event) {
        booking.date = event.target.value;
        if (event.target.value !== '') {
            if (timeDisabled === true)
                setTimeDisabled(false);
            fetchAvailableTimes(event.target.value);
        }
        handleChange(event);
    }

    const numberRegExp = /^[0-9 \b]+$/

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, '*Namn måste vara minst 2 tecken')
            .max(100, '*Namn kan inte vara mer än 100 tecken')
            .required('*Du måste ange ett namn'),
        tel: Yup.string()
            .matches(numberRegExp, '*Telefonnummer är inte giltigt')
            .required('*Du måste ange ett telefonnummer'),
        info: Yup.string()
            .max(150, '*Övrig info kan inte vara mer än 150 tecken')
    })

    return (
        <Formik
            initialValues={{
                name: props.booking.guestName, tel: props.booking.guestTelNr, info: props.booking.additionalInfo,
                guests: props.booking.nrOfPeople, date: props.booking.bookingDate, time: props.booking.startTime.slice(0, 5)
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                saveValues(values);
                submitBooking();
                setSubmitting(false);
            }}
        >
            {({ values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGuests">

                            <Form.Label>Antal Gäster</Form.Label>
                            <Form.Control
                                name='guests'
                                type='number'
                                placeholder='Ange antal'
                                onChange={e => guestsChange(handleChange, e)}
                                defaultValue={props.booking.nrOfPeople}
                                value={values.guests}
                                className={touched.guests}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formDate">

                            <Form.Label>Datum</Form.Label>
                            <Form.Control as="select" disabled={dateDisabled}
                                type='text'
                                name='date'
                                onChange={e => dateChange(handleChange, e)}
                                value={values.date}
                                className={touched.date}
                            >
                                <option>Välj datum</option>
                                {dayList.map(date => (
                                    <option>{date}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formTime">

                            <Form.Label>Tid</Form.Label>
                            <Form.Control as="select" disabled={timeDisabled}
                                type='text'
                                name='time'
                                placeholder='Välj tid'
                                onChange={handleChange}
                                value={values.time}
                                className={touched.time}
                            >
                                <option>Välj tid</option>
                                {timeList.map(time => (
                                    <option>{time.slice(0, 5)}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formName">
                        <Form.Label>Namn</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            placeholder='Skriv in namn'
                            onChange={handleChange}
                            value={values.name}
                            className={touched.name && errors.name ? "has-error" : null}
                        />
                        {touched.name && errors.name ? (
                            <div className="error-message">{errors.name}</div>
                        ) : null}
                    </Form.Group>
                    <Form.Group controlId="tel">
                        <Form.Label>Telefonnummer</Form.Label>
                        <Form.Control
                            type='text'
                            name='tel'
                            placeholder='Skriv in telefonnummer'
                            onChange={handleChange}
                            value={values.tel}
                            className={touched.tel && errors.tel ? "has-error" : null}
                        />
                        {touched.tel && errors.tel ? (
                            <div className="error-message">{errors.tel}</div>
                        ) : null}
                    </Form.Group>
                    <Form.Group controlId="info">
                        <Form.Label>Övrig information</Form.Label>
                        <Form.Control
                            as='textarea'
                            type='text'
                            name='info'
                            placeholder='Allergier, etc.'
                            onChange={handleChange}
                            value={values.info}
                            className={touched.info && errors.info ? "has-error" : null}
                        />
                        {touched.info && errors.info ? (
                            <div className="error-message">{errors.info}</div>
                        ) : null}
                    </Form.Group>
                    <Button variant='success' type="submit">
                        Bekräfta
                    </Button>
                </Form>
            )}
        </Formik>
    )
}