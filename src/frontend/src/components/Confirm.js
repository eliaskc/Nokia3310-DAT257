import React from 'react'

export default function Confirm(props) {
    return (
        <div className="Confirm">
            <h2 className="Guests">
                Guests: {props.guestProps.toString()}
            </h2>
            <h2 className="Date">
                Date: {props.dateProps.toDateString()}
            </h2>
            <h2 className="Time">
                Time: {props.timeProps.toString()}
            </h2>
        </div>
    )
}