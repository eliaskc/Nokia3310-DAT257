import React from 'react'
import Button from 'react-bootstrap/Button'

export default function Contact(){
    return(
        <div>
            <div className='text_box'>
                <h3>
                    Telefon: 0304 570 07
                </h3>
                <h3>
                    E-post: info@gullholmenshamncafe.se
                </h3>
                <h3>
                    Adress: Torget 105, Gullholmen
                </h3>
            </div>
            <Button href='/'>Tillbaka</Button>
        </div>
    )
}