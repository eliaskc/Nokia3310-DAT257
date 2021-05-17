import React from 'react'
import Button from 'react-bootstrap/Button'

/**
 * Component representing the 'thanks' page
 * @returns 
 */
export default function Done(){
    return (
        <div>
            <div className='text_box'>
                <h2>
                Tack för din bokning!
                </h2>
            </div>
            <Button href='/'>
                TIllbaka till start
            </Button>
        </div>
    );
}