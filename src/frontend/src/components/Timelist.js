import React from 'react'
import Button from 'react-bootstrap/Button';

export default function Timelist(props) {
    
    //example of times, will be populated with times from backend
    const times = [
        {time_string: '12:00'},
        {time_string: '13:00'},
        {time_string: '14:00'},
        {time_string: '15:00'},
        {time_string: '16:00'},
        {time_string: '17:00'},
        {time_string: '18:00'},
        {time_string: '19:00'}]

    function displayTime(time){
        console.log(time.time_string)
        props.timeProps(time.time_string)
    }

    return (
        <div>
            <h2><span>Pick a time</span></h2>
            {times.map((time, index) => (
                <Button onClick={() => displayTime(time)} key={index}> {time.time_string}</Button>
            ))}
        </div>
    )
}