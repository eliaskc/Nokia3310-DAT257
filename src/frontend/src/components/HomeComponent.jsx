import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Calendar from './Calendar';
import Timelist from './Timelist';
import Guests from './Guests';
import Confirm from './Confirm';

function HomeComponent() {
    const [guests, setGuests] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    function onConfirm() {
        console.log(guests)
        console.log(date)
        console.log(time)
    };

    return (
        <div className="App">
            <header className="App-header">

                <img src="/hamncafet_logo.jpg" alt="Hamncafét logga" className="main_logo" />

                <Router>
                    <nav>
                        <ul>
                            <li> <Link to='/guests'>1</Link></li>
                            <li> <Link to='/date'>2</Link></li>
                            <li> <Link to='/timelist'>3</Link></li>
                            <li> <Link to='/confirm'>4</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path='/guests'>
                            <Guests guestProps={setGuests} />
                        </Route>
                        <Route path='/date'>
                            <Calendar dateProps={setDate} />
                        </Route>
                        <Route path='/timelist'>
                            <Timelist timeProps={setTime} />
                        </Route>
                        <Route path='/confirm'>
                            <Confirm guestProps={guests} dateProps={date} timeProps={time} />
                        </Route>
                    </Switch>
                </Router>

                <div className='confirm-btn'>
                    <Button onClick={onConfirm}>Confirm</Button>
                </div>

                <div>
                    <Button href="/availableTimes">Lediga tider!</Button>
                </div>

            </header>
        </div>
    );
}

export default HomeComponent;