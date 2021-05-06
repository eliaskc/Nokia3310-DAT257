import Button from 'react-bootstrap/Button'
import React,{useState, useRef} from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

import Wizard from './Wizard'
import Contact from './Contact'

/**
 * Component for the Home page 
 */
function HomeComponent() {
    return (
        <div className="App">
            <div className='background-image'>
                <div class="blur"/>
            </div>
            <header className="App-header">
                <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo" />
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Button href="/guests">Boka bord</Button>
                            <Button href="/bookings">Se bokningar</Button>
                            <Button className='contact-btn' href="/contact" >Kontakt</Button>
                        </Route>
                        <Route path='/guests'>
                            <Wizard/>
                        </Route>
                        <Route path='/contact'>
                            <Contact/>
                        </Route>
                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default HomeComponent;