import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import {Formik,Form, Field} from 'formik'
import BookingDataService from '../../api/BookingDataService.js'
import BookingTimeSlotComponent from './BookingTimeSlotComponent.jsx';

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [date,setDate] = useState(moment(new Date("2021-05-05")).format('YYYY-MM-DD'));

    useEffect(() => {
        console.log(date)
        refreshTimeSlots(date);
    },[date]);

    const refreshTimeSlots = (inputDate) => {
        inputDate = moment(inputDate).format('YYYY-MM-DD');
        console.log(inputDate)
        BookingDataService.getTimeSlotsByDate(inputDate)
            .then(
                (response) => {
                    setTimeSlots(response.data);
                    setDate(inputDate);
                }
            );
    }

    const submitDate = (values) => {
        refreshTimeSlots(values.date);
    }
    

    return (
        <div>
            <div>
            <Formik 
                    initialValues = {{date: date}}
                    onSubmit={submitDate}
                    enableReinitialize={true}
                >
                {
                    () => (
                        <Form>
                            <fieldset className="form-group">
                                <Field className="form-control" type="date" name="date"/>
                            </fieldset>
                            <button className="btn btn-success" type="submit" >save</button>
                        </Form>
                    )
                }
            </Formik>
            <div>{date}</div>
            </div>
            <div className="BookingListComponent">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Tid</th>
                            <th>Antal bord</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            timeSlots.map(
                                timeSlot => 
                                    <BookingTimeSlotComponent key={timeSlot} inputTime={timeSlot} inputDate={date}/>
                            )
                        }
                    </tbody>
                </Table>
                <Button href="/">Tillbaka</Button>
            </div>
        </div>
    )
}

export default BookingListComponent;