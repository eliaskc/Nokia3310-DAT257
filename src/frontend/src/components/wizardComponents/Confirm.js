import React,{useState} from 'react'
import Button from 'react-bootstrap/Button'
import BookingDataService from '../../api/BookingDataService.js'
import {Link, useHistory} from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'

/**
 * Represents the confirmation page
 * @param props Object that represents the current booking
 * @returns 
 */
export default function Confirm(props) {
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    //Checks that there exists values for everything that is required
    function checkBookingComplete() {
        return !(props.booking.name === '' ||
            props.booking.tel === '' ||
            props.booking.guests === '' ||
            props.booking.date === '' ||
            props.booking.time === '');
    }

    /**
     * Javascript object created with the values of props, in order for the backend to be able to handle it
     */
    let booking = {
        guestName: props.booking.name,
        guestTelNr: props.booking.tel,
        nrOfPeople: props.booking.guests,
        bookingDate: props.booking.date,
        startTime: props.booking.time,
        additionalInfo: props.booking.info
    }
    /*
    Check that the booking is complete and that the database is able to recieve the booking
    othervise send a alert to show that something is wrong.
    Afterwards are you sent to the correct place depending on if the booking was recived correctly
    */
    function onConfirm() {
        if (!checkBookingComplete()) {
            alert('Du måste fylla i all information')
        } else {
            setLoading(true)
            BookingDataService.createBooking(booking).then(response => {
                setLoading(false)
                history.push('/done')
            }).catch(error => {
                alert('Någonting gick fel')
                history.push('/')
                history.go()
            })
        }
    }
    
    return (
        <div>
            {loading ? 
            <div className='loader'>
                <DotLoader color={'#FFFFFF'}/>
            </div>
            :
            <div>
                <div className='text_box'>
                    <h2>Översikt</h2>
                    <h3 className="confirmName">
                        Namn: {props.booking.name}
                    </h3>
                    <h3 className="confirmTel">
                        Telefonnummer: {props.booking.tel}
                    </h3>
                    <h3 className="confirmGuests">
                        Antal gäster: {props.booking.guests.toString()}
                    </h3>
                    <h3 className="confirmDate">
                        Datum: {props.booking.date.toLocaleString('swe', {month: '2-digit', day: '2-digit'})}
                    </h3>
                    <h3 className="confirmTime">
                        Tid: {props.booking.time}
                    </h3>
                    <h3 className="confirmInfo">
                        Övrig info: {props.booking.info}
                    </h3>
                </div>
                <div>
                    <Link className='prevLink' to={'/info'}>
                        <Button>
                            Tillbaka
                        </Button>
                    </Link>
                    <Button onClick={() => onConfirm()}>
                        Bekräfta
                    </Button>   
                </div>
            </div>
            }
        </div>
    )
}