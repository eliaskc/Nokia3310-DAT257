import React from 'react'
import Button from 'react-bootstrap/Button';

export default function Timelist(props) {
    
    //example of times, will be populated with times from backend
    const times = [
        {time_string: '17:00'},
        {time_string: '17:30'},
        {time_string: '18:00'},
        {time_string: '18:30'},
        {time_string: '19:00'}
    ]

    return (
        <div>
            <h2><span>Pick a time</span></h2>
            {times.map((time, index) => (
                <Button onClick={() => props.timeProps(time.time_string)} key={index}> {time.time_string}</Button>
            ))}
        </div>
    )
}