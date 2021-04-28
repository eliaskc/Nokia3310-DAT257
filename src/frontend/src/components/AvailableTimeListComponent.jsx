import React, {useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import BookingDataService from '../api/BookingDataService.js'

export default function AvailableTimeListComponent() {
    const [availableTimeList,setAvailableTimeList] = useState([]);

    useEffect(() => {
        refreshTimeList();
      }, []);

    const refreshTimeList = () => {
        BookingDataService.retrieveAllAvailableTimes()
        .then(
            (response) => {
                setAvailableTimeList(response.data)
            }
        )
    }

    return (
        <div className="AvailableTimeListComponent">
            <Table responsive>
                <thead>
                    <tr>
                        <th>Lediga tider idag</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        availableTimeList.map(
                            availableTime =>
                                <tr key={availableTime}>
                                    <td>{availableTime}</td>
                                </tr>
                        )
                    }
                </tbody>
            </Table>
            <Button href="/">Tillbaka</Button>
        </div>
        
    )
}