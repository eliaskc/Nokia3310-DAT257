import React,{useRef} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Calendar from './wizardComponents/Calendar';
import Timelist from './wizardComponents/Timelist';
import Guests from './wizardComponents/Guests';
import AdditionalInfo from './wizardComponents/AdditionalInfo';
import Confirm from './wizardComponents/Confirm';
import Done from './wizardComponents/Done';
/**
 * Represents how we route to the pages and what gets sent where
 * @returns 
 */
export default function Wizard(){
    
    /**
     * Javascript object that is what gets chenged as the user makes their booking
     */
    const bookingJSON = useRef({
        'name': '',
        'tel': '',
        'info': '',
        'guests': 0,
        'date': '',
        'time': ''
    })

    return (
        <Router>       
            <Switch>
                <Route path='/guests'>
                    <Guests booking={bookingJSON.current}/>
                </Route>
                <Route path='/date'>
                    <Calendar booking={bookingJSON.current}/>
                </Route>
                <Route path='/timelist'>
                    <Timelist booking={bookingJSON.current}/>
                </Route>
                <Route path='/info'>
                    <AdditionalInfo booking={bookingJSON.current}/>
                </Route>
                <Route path='/confirm'>
                    <Confirm booking={bookingJSON.current}/>
                </Route>
                <Route path='/done'>
                    <Done/>
                </Route>
            </Switch>                      
        </Router>
    )
}