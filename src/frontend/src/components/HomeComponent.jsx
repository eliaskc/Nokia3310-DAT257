import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Calendar from './Calendar';
import Timelist from './Timelist';
import Guests from './Guests';
import AdditionalInfo from './AdditionalInfo';
import Confirm from './Confirm';

function HomeComponent() {
    const [guests, setGuests] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [info, setInfo] = useState('');


    function onConfirm() {
        console.log(guests)
        console.log(date)
        console.log(time)
        console.log(name)
        console.log(email)
        console.log(tel)
        console.log(info)
    };

    return (
        <div className="App">
            <header className="App-header">

                <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo" />

                <Router>
                    <nav>
                        <ul>
                            <li> <Link to='/guests'>Gäster</Link></li>
                            <li> <Link to='/date'>Datum</Link></li>
                            <li> <Link to='/timelist'>Tider</Link></li>
                            <li> <Link to='/info'>Personlig info</Link></li>
                            <li> <Link to='/confirm'>Bekräfta</Link></li>
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
                        <Route path='/info'>
                            <AdditionalInfo nameProps={name} emailProps={email} telProps={tel} infoProps={info}/>
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
                    <Button href="/bookings">See bookings </Button>
                </div>

            </header>
        </div>
    );
}

export default HomeComponent;