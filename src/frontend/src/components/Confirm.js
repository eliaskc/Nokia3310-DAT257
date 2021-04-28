import React from 'react'

export default function Confirm(props) {
    return (
        <div className="Confirm">
            <h2 className="Guests">
                Antal gäster: {props.guestProps.toString()}
            </h2>
            <h2 className="Date">
                Datum: {props.dateProps.toLocaleString('swe', {month: '2-digit', day: '2-digit'})}
            </h2>
            <h2 className="Time">
                Tid: {props.timeProps.toString()}
            </h2>
        </div>
    )
}