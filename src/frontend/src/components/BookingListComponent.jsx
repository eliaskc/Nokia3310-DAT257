import React, {useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import {Formik,Form, Field,ErrorMessage} from 'formik'
import BookingDataService from '../api/BookingDataService.js'

/**
 * Component that shows a list of all bookings
 */
function BookingListComponent() {
    const [bookings,setBookings] = useState([]);


    useEffect(() => {
        refreshBokings();
      }, []);

    const refreshBokings = (date,time) => {
        date = moment(date).format('YYYY-MM-DD')
        console.log(time)
        BookingDataService.getBookingsByDateAndTime(date,time)
        .then(
            (response) => {
                setBookings(response.data)
            }
        )
    }

    const updateBookingClicked = (id) =>{
        //TODO
    }

    const deleteBookingClicked = (id) =>{
       //TODO
    }

    const testMethod = (values) => {
        refreshBokings(values.targetDate,values.targetTime);
    }

    const date = new Date()
    return (

        <div className="BookingListComponent">
            <div className="container">
                <Formik 
                        initialValues = {{date,}}
                        onSubmit={testMethod}
                        enableReinitialize={true}
                >
                    {
                            () => (
                                <Form>
                                    <div>
                                        <fieldset className="form-group">
                                            <label>Datum</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                            <label>Tid</label>
                                            <Field className="form-control" type="time" name="targetTime"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit" >save</button>
                                    </div>
                                </Form>
                            )
                        }
                </Formik>
            </div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Datum</th>
                        <th>Antal personer</th>
                        <th>Email</th>
                        <th>Ändra</th>
                        <th>Ta bort</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(
                            booking =>
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{moment(booking.bookingDate).format("YYYY-MM-DD")}</td>
                                    <td>{booking.nrOfPeople}</td>
                                    <td>{booking.guestEmail}</td>
                                    <td><Button onClick={() => updateBookingClicked(booking.id)}>Uppdatera</Button></td>
                                    <td><Button variant="danger" onClick={() => deleteBookingClicked(booking.id)}>Ta bort</Button></td>
                                </tr>
                        )
                    }
                </tbody>
            </Table>
            <Button href="/">Tillbaka</Button>
        </div>
        
    )
}

export default BookingListComponent;