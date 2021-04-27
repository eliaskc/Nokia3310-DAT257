import Button from 'react-bootstrap/Button'
import React,{useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Calendar from './Calendar';
import Timelist from './Timelist';
import Guests from './Guests';
import AdditionalInfo from './AdditionalInfo';
import Confirm from './Confirm';

function HomeComponent() {
    const bookingJSON = {
        'name': '',
        'email': '',
        'tel': '',
        'info': '',
        'guests': 0,
        'date': undefined,
        'time': ''
    }

    let page = 0
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('/date')
    const pages = ['/guests', '/date', '/timelist', '/info', 'confirm']

    function handlePrevPage(){
        console.log('Page before: ' + page)
        if (page !== 0){
            page--
        }
        console.log('Page after: ' + page)
        setPrevPage(pages[page])
    }

    function handleNextPage(){
        console.log('Page before: ' + page)
        if (page !== pages.length){
           page++
        }
        console.log('Page after: ' + page)
        setNextPage(pages[page])
    }

    function seebooking(){
        console.log(bookingJSON)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src="/hamncafet_logo.png" alt="Hamncafét logga" className="main_logo" />
                <Router>
                    <nav>
                        <ul>
                            <Link to={prevPage} onClick={e => handlePrevPage()}>Tillbaka</Link>
                            <Link to={nextPage} onClick={e => handleNextPage()}>Nästa</Link>
                        </ul>
                    </nav> 
                    <Switch>
                        <Route path='/guests'>
                            <Guests booking={bookingJSON}/>
                        </Route>
                        <Route path='/date'>
                            <Calendar booking={bookingJSON}/>
                        </Route>
                        <Route path='/timelist'>
                            <Timelist booking={bookingJSON}/>
                        </Route>
                        <Route path='/info'>
                            <AdditionalInfo booking={bookingJSON}/>
                        </Route>
                        <Route path='/confirm'>
                            <Confirm booking={bookingJSON}/>
                        </Route>
                    </Switch>
                </Router>

                <div className='book-btn'>
                    <Button href="/guests">Boka bord</Button>
                </div>

                <div>
                    <Button href="/bookings">See bookings </Button>
                </div>

                <div>
                    <Button onClick={e => seebooking()}>PRINT </Button>
                </div>

            </header>
        </div>
    );
}

export default HomeComponent;