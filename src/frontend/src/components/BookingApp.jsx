import React, {Component,useState,useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch,Link} from 'react-router-dom'
import BookingListComponent from './BookingListComponent'
import HomeComponent from './HomeComponent'

function BookingApp() {
    return(
        <div>
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