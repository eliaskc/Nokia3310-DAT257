import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AvailableTimeListComponent from './components/AvailableTimeListComponent'
import HomeComponent from './components/HomeComponent'
import './BookingApp.sass'
import 'bootstrap/dist/css/bootstrap.min.css';

function BookingApp() {
    return(
        <div className='BookingApp'>
            <Router>
            <>  
                <Switch>
                        <Route path="/availableTimes" component={AvailableTimeListComponent}/>
                        <Route path="/" component={HomeComponent}/>
                </Switch>   
            </>
            </Router>
        </div>
    )
}

export default BookingApp;