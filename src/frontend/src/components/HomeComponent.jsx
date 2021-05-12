import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DownloadInstructions from './DownloadInstructions';
import Wizard from './Wizard'
import LoginForm from './LoginForm'

/**
 * Component for the Home page 
 */
function HomeComponent() {
    const [showLogin, setShowLogin] = useState(false)
    const [showContact, setShowContact] = useState(false)

    return (
        <div className="App">
            <div className='background-image'>
                <div className="blur" />
            </div>
            <header className="App-header">
                <a href='/'>
                    <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo"/>
                </a>

                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <Button href="/guests">Boka bord</Button>
                            <Button href="/bookings">Se bokningar</Button>
                            <Button className='login-btn' onClick={() => setShowLogin(true)}>🔑</Button>

                            <div>
                                <Button className='contact-btn' onClick={() => setShowContact(!showContact)}>Kontakt</Button>
                                {showContact ? 
                                <div class="card" className="contact-card">
                                    <div class="card-body">
                                        <div className="italictext">
                                            <em>Har ni några frågor eller vill hellre boka via telefon eller mail? Tveka inte att kontakta oss!<br />
                                            </em></div>
                                        <div>
                                            Telefon: <a href="tel:0304-570-07">0304-570 07</a> <br />
                                            Email: <a href="mailto:info@gullholmenshamncafe.se">info@gullholmenshamncafe.se</a></div>
                                    </div>
                                </div> : null}
                            </div>
                            
                            {showLogin ? 
                            <LoginForm showLoginProp={showLogin} setShowLoginProp={setShowLogin}/>
                            : null}

                            <DownloadInstructions/>
                        </Route>

                        <Route path='/guests'>
                            <Wizard/>
                        </Route>

                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default HomeComponent;