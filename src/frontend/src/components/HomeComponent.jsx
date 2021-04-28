import Button from 'react-bootstrap/Button'
import React,{useState, useRef} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Calendar from './Calendar';
import Timelist from './Timelist';
import Guests from './Guests';
import AdditionalInfo from './AdditionalInfo';
import Confirm from './Confirm';

/**
 * Main controller/page
 * 
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

    let page = useRef(1)
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('/date')
    const pages = ['', '/guests', '/date', '/timelist', '/info', 'confirm']

    function handlePages(action){
        if (page.current !== 0 && action === 'prev'){
            page.current--
        }
        if (page.current !== pages.length && action === 'next'){
            page.current++
         }
         setPrevPage(pages[Math.max(page.current-1, 0)])
         setNextPage(pages[Math.min(page.current+1, pages.length-1)])
    }

    return (
        <div className="App">
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
                    </nav> 
                </Router>

                <div className='book-btn'>
                    <Button href="/guests">Boka bord</Button>
                </div>

                <div>
                    <Button href="/bookings">See bookings </Button>
                </div>

            </header>
        </div>
    );
}

export default HomeComponent;