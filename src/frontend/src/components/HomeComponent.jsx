import React, {useState } from 'react';
import Button from 'react-bootstrap/Button';

function HomeComponent() {
    const [message,setMessage] = useState("Hello world");

    const clickMe = (text) => {
      setMessage(message)
    }

    return (
        <div className="HomeComponent">
            <header className="App-header">
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                    <img src="/hamncafeet-logo.jpeg" alt="Hamncafeet logga" />
                </a>

                {message}
                <div>
                    <Button onClick={() => clickMe("Hello world: 0")}>Arvid</Button>
                    <Button onClick={() => clickMe("Hello world: 1")}>Lisa</Button>
                    <Button onClick={() => clickMe("Hello world: 2")}>Elias H</Button>
                    <Button onClick={() => clickMe("Hello world: 3")}>Elias KC</Button>
                    <Button onClick={() => clickMe("Hello world: 4")}>Astrid</Button>
                    <Button onClick={() => clickMe("waddap")}>Erik</Button>
                    <Button onClick={() => clickMe("Jag la inte in knappen sist")}>Ida :)</Button>
                </div>
                <div>
                    <Button href="/bookings">See bookings </Button>
                </div>
            </header>
        </div>
    )
}

export default HomeComponent;