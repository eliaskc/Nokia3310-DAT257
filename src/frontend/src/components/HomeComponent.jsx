import Button from 'react-bootstrap/Button'
import React,{useState, useRef} from 'react'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom'

import Calendar from './Calendar';
import Timelist from './Timelist';
import Guests from './Guests';
import AdditionalInfo from './AdditionalInfo';
import Confirm from './Confirm';
import Thanks from './Thanks';

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
    const pages = ['', '/guests', '/date', '/timelist', '/info', 'confirm']
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('/guests')

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

    //If someone tries to access the page by going directly
    //to, for example, /date then redirect to home page
    if (page.current === 0 && window.location.pathname !== '/' && window.location.pathname !== '/thanks'){
        return (
            <Redirect to=''/>
        )
    }
    
    return (
        <div className="App">
            <div className='background-image'>
                <div class="blur"/>
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
                        <Route path='/thanks'>
                            <Thanks/>
                        </Route>
                    </Switch>


                    <div>
                        {page.current > 0 && page.current < pages.length-1 && (

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
                        
                        {page.current === 0 && window.location.pathname !== '/thanks' && ( <nav>
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

                        {page.current === pages.length-1 && ( <nav>
                            <Link className='book-lnk' to={prevPage} onClick={e => handlePages('prev')}>
                                <Button>
                                    Ändra i bokning
                                </Button>
                            </Link>
                            </nav>)                        
                        }
                    </div>
                </Router>
            </header>
        </div>
    );
}

export default HomeComponent;