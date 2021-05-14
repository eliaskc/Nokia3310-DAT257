import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import { Formik, Form, Field } from 'formik'
import BookingDataService from '../../api/BookingDataService.js'
import BookingTimeSlotComponent from './BookingTimeSlotComponent.jsx';
import { Redirect} from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'
import UserAuth from '../UserAuth.js'

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
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

    function logOut(){
        UserAuth.logOutUser()
        setIsAuthenticated(false)
    }

    const submitDate = (values) => {
        refreshTimeSlots(values.date);
    }

    return (
        <div>
            {isAuthenticated && !loading && 
            <div className="BookingListComponent">
                <div>
                    <Button onClick={() => logOut()}>
                        Logga ut
                    </Button>
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
                                    <Button variant="primary" className="btn btn-success" type="submit" >Uppdatera datum</Button>
                                </Form>
                            )
                        }
                    </Formik>
                    <h2>Visar tider för: {date}</h2>
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
            </div>}

            {loading && !isAuthenticated &&
            <div className='bookingListRoot'>
                <DotLoader size='100px'/>
            </div>}

            {!loading && !isAuthenticated && 
            <Redirect to='/'/>}
            
        </div>
    )
}

export default BookingListComponent;