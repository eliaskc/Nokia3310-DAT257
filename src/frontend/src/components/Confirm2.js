import React from 'react'

export default function Confirm(props) {
    return (
        <div className="Confirm">
            <div className="Guests">
                <p>{props.guestProps}</p>
            </div>
            <div className="Date">
                <p>{props.dateProps}</p>
            </div>
            <div className="Time">
                {props.timeProps}
            </div>
        </div>
    )
}