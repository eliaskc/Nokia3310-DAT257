import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import BookingListComponent from './components/BookingListComponent'
import HomeComponent from './components/HomeComponent'
import './BookingApp.sass'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';


function BookingApp() {
    return(
        <div className='BookingApp'>
            <AddToHomeScreen/>
            
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