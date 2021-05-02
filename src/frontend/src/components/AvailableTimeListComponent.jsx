import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import BookingDataService from '../api/BookingDataService.js'
import moment from 'moment';

/**
 * Components that fetches and shows all available times
 */
export default function AvailableTimeListComponent() {
    const [availableTimeList, setAvailableTimeList] = useState([]);

    useEffect(() => {
        refreshTimeList();
    }, []);

    const refreshTimeList = () => {
        BookingDataService.retrieveAllAvailableTimes(moment(new Date()).format("YYYY-MM-DD"), '17:00:00', 2)
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