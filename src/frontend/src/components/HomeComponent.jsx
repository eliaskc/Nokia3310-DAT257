import Button from 'react-bootstrap/Button'
import React,{useState, useRef} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Calendar from './Calendar';
import Timelist from './Timelist';
import Guests from './Guests';
import AdditionalInfo from './AdditionalInfo';
import Confirm from './Confirm';
import AvailableTimeListComponent from './AvailableTimeListComponent';
import Contact from './Contact';

/**
 * Component for the Home page 
 */
function HomeComponent() {
    const bookingJSON = useRef({
        'name': '',
        'email': '',
        'tel': '',
        'info': '',
        'guests': 0,
        'date': '',
        'time': ''
    })

    let page = useRef(0)
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('/guests')
    const pages = ['', '/guests', '/date', '/timelist', '/info', 'confirm']

    function handlePages(action){
        if (page !== 0 && action === 'prev'){
            page.current--
        }
        if (page !== pages.length && action === 'next'){
            page.current++
         }
         setPrevPage(pages[Math.max(page.current-1, 0)])
         setNextPage(pages[Math.min(page.current+1, pages.length-1)])
    }

    return (
        <div className="App">
            <div className='background-image'>

            </div>
            <header className="App-header">
                <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo" />
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
                    </Switch>


                    <div>
                        {page.current > 0 && page.current < 5 && (

                        <nav>
                            <Link className='prevLink' to={prevPage} onClick={e => handlePages('prev')}>
                                <Button>
                                    Tillbaka
                                </Button>
                            </Link>
                            <Link className='nextLink' to={nextPage} onClick={e => handlePages('next')}>
                                <Button>
                                    Nästa
                                </Button>
                            </Link>
                        </nav>) }
                        
                        {page.current === 0 && ( <nav>
                            <Link className='book-lnk' to={nextPage} onClick={e => handlePages('next')}>
                                <Button>
                                    Boka bord
                                </Button>
                            </Link>
                                <div>
                                    <Button href="/bookings">Se bokningar</Button>
                                </div>
                                <div>
                                    <Button className='contact-btn' href="/contact" >Kontakt</Button>
                                </div>
                            </nav>)                        
                        }

                        {page.current === 5 && ( <nav>
                            <Link className='book-lnk' to={prevPage} onClick={e => handlePages('prev')}>
                                <Button>
                                    Ändra i bokning
                                </Button>
                            </Link>
                            </nav>)                        
                        }
                    </div>
                </Router>
                <div>
                    <AvailableTimeListComponent/>
                </div>

            </header>
        </div>
    );
}

export default HomeComponent;