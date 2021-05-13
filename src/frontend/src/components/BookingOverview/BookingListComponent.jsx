import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import BookingDataService from '../../api/BookingDataService.js'
import BookingTimeSlotComponent from './BookingTimeSlotComponent.jsx';
import BookingInputComponent from './BookingInputComponent.jsx';

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

    useEffect(() => {
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

    const submitDate = (values) => {
        refreshTimeSlots(values.date);
    }


    return (
        <div className="BookingListComponent">
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
                <Button variant="primary" className="btn btn-success" >Skapa bokning</Button>
                <BookingInputComponent/>
                <h2>Visar bokningar för: {date}</h2>
            </div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Tid</th>
                        <th>Antal bord</th>
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
    )
}

export default BookingListComponent;