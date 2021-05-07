import React from 'react'
import Button from 'react-bootstrap/Button'

/**
 * Component representing the 'thanks' page
 * @returns 
 */
export default function Thanks(){
    return (
        <div className='thanks_div'>
            <h2>
                Tack för din bokning!
            </h2>
            <h2>
                Ett bekräftelsemejl kommer till din e-post inom kort.
            </h2>
            <Button href='/'>
                TIllbaka till start
            </Button>
        </div>
    );
}