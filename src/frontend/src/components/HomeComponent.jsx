import Button from 'react-bootstrap/Button'
import React,{useState, useRef} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Calendar from './Calendar';
import Timelist from './Timelist';
import Guests from './Guests';
import AdditionalInfo from './AdditionalInfo';
import Confirm from './Confirm';

function HomeComponent() {
    const bookingJSON = useRef({
        'name': '',
        'email': '',
        'tel': '',
        'info': '',
        'guests': 0,
        'date': undefined,
        'time': ''
    })

    let page = 0
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('/date')
    const pages = ['/guests', '/date', '/timelist', '/info', 'confirm']

    function handlePages(action){
        console.log(bookingJSON.current)
        if (page !== 0 && action === 'prev'){
            page--
        }
        if (page !== pages.length && action === 'next'){
            page++
         }

         setPrevPage(pages[page-1])
         setNextPage(pages[page+1])
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo" />
                <Router>
                    <nav>
                        <ul>
                            <Link to={prevPage} onClick={e => handlePages('prev')}>Tillbaka</Link>
                            <Link to={nextPage} onClick={e => handlePages('next')}>Nästa</Link>
                        </ul>
                    </nav> 
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