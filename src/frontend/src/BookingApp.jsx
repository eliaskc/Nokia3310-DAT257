import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import BookingListComponent from './components/BookingOverview/BookingListComponent'
import HomeComponent from './components/HomeComponent'
import './BookingApp.sass'
import 'bootstrap/dist/css/bootstrap.min.css';

function BookingApp() {
    return(
        <div className='BookingApp'>
            <Router>
            <>  
                <Switch>
                        <Route path="/bookings" component={BookingListComponent}/>
                        <Route path="/" component={HomeComponent}/>
                </Switch>   
            </>
            </Router>
        </div>
    )
}

export default BookingApp;