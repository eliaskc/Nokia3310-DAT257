import React, { useState, useEffect } from 'react';
import BookingDataService from '../../api/BookingDataService.js'
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Col } from 'react-bootstrap'


export default function BookingAddComponent(props) {
    const [booking, setBooking] = useState({
        'name': '',
        'tel': '',
        'info': '',
        'guests': 0,
        'date': '',
        'time': ''
    });
    const [showModal, setShowModal] = useState(true);
    const [dateDisabled, setDateDisabled] = useState(true);
    const [timeDisabled, setTimeDisabled] = useState(true);
    const [dayList, setDayList] = useState([])
    const [timeList, setTimeList] = useState([])

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleShowModal = () => {
        setShowModal(true);
    }

    function saveValues(values) {
        console.log(values);
        setBooking({
        'name': values.name,
        'tel': values.tel,
        'info': values.info,
        'guests': values.guests,
        'date': values.date,
        'time': values.time
        });
    }

    function fetchAvailableTimes() {
        console.log(booking.guests)
        BookingDataService.retrieveAllAvailableDays(booking.guests)
            .then(
                (response) => {
                    setDayList(response.data)
                    console.log(dayList)
                }
            )
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
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Skapa bokning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ name: '', tel: '', info: '', guests: 0, date: '', time: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        saveValues(values);
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
                            <div className='text_box'>
                                <Form.Group controlId="formGuests">

                                    <Form.Label>Antal Gäster</Form.Label>
                                    <Form.Control
                                        type='number'
                                        name='guests'
                                        placeholder='Ange antal gäster'
                                        value={values.guests}
                                        onChange={() => [handleChange, setDateDisabled(false), fetchAvailableTimes()]}
                                        className={touched.guests}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formDate">

                                        <Form.Label>Datum</Form.Label>
                                        <Form.Control as="select" disabled={dateDisabled}
                                            type='text'
                                            name='date'
                                            onChange={() => [handleChange, saveValues, setTimeDisabled(false)]}
                                            value={values.date}
                                            className={touched.date}
                                        >
                                            <option>Välj Datum</option>
                                            <option>2021-01-01</option>
                                            <option>2021-01-01</option>
                                            <option>2021-01-01</option>
                                            <option>2021-01-01</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formTime">

                                        <Form.Label>Tid</Form.Label>
                                        <Form.Control as="select" disabled={timeDisabled}
                                            type='text'
                                            name='time'
                                            placeholder='Välj Tid'
                                            onChange={handleChange}
                                            value={values.time}
                                            className={touched.time}
                                        >
                                            <option>Välj Tid</option>
                                            <option>18:00</option>
                                            <option>18:00</option>
                                            <option>18:00</option>
                                            <option>18:00</option>
                                            <option>18:00</option>
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
                            </div>
                            <Button variant='danger' onClick={handleCloseModal}>
                                Avbryt
                            </Button>
                            <Button variant='primary' type='submit' disabled={isSubmitting}>
                                Bekräfta
                            </Button>
                        </Form>
                    )}
                </Formik>
                {/*<Formik>
                    <Form>
                        <Form.Group controlId="nameInput">
                            <Form.Label>Namn</Form.Label>
                            <Form.Control 
                                as='textarea'
                                type='text'
                                name='info'
                                placeholder='Namn'
                                onChange={handleChange}
                                value={values.info}
                                className={touched.info && errors.info ? "has-error" : null}
                            />
                            {touched.info && errors.info ? (
                            <div className="error-message">{errors.info}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group controlId="telNrInput">
                            <Form.Label>Telefonnummer</Form.Label>
                            <Form.Control 
                                as='textarea'
                                type='text'
                                name='info'
                                placeholder='Telefonnummer'
                                onChange={handleChange}
                                value={values.info}
                                className={touched.info && errors.info ? "has-error" : null}
                            />
                            {touched.info && errors.info ? (
                            <div className="error-message">{errors.info}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group controlId="additionalInfoInput">
                            <Form.Label>Övrig information: </Form.Label>
                            <Form.Control 
                                as='textarea'
                                type='text'
                                name='info'
                                placeholder='Övrig information'
                                onChange={handleChange}
                                value={values.info}
                                className={touched.info && errors.info ? "has-error" : null}
                            />
                            {touched.info && errors.info ? (
                            <div className="error-message">{errors.info}</div>
                            ): null}
                        </Form.Group>
                    </Form>
                            </Formik>*/}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}