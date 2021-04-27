import React from 'react'
import {Link} from 'react-router-dom'

export default function Confirm(props) {
    return (
        <div className="Confirm">
            <h2 className="confirmName">
                Namn: {props.nameProps.toString()}
            </h2>
            <h2 className="confirmEmail">
                E-post: {props.emailProps.toString()}
            </h2>
            <h2 className="confirmTel">
                Telefonnummer: {props.telProps.toString()}
            </h2>
            <h2 className="confirmInfo">
                Övrig info: {props.infoProps.toString()}
            </h2>
            <h2 className="confirmGuests">
                Antal gäster: {props.guestProps.toString()}
            </h2>
            <h2 className="confirmDate">
                Datum: {props.dateProps.toLocaleString('swe', {month: '2-digit', day: '2-digit'})}
            </h2>
            <h2 className="confirmTime">
                Tid: {props.timeProps.toString()}
            </h2>
            <nav>
                <ul>
                    <li> <Link to={props.Prev}>Tillbaka</Link></li>
                </ul>
            </nav>
        </div>
    )
}