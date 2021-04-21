import Button from 'react-bootstrap/Button';

export default function Guests(props) {
    return (
        <div>
            <h2><span>Number of guests</span></h2>
            <Button onClick={() => props.guestProps(1)}>1</Button>
            <Button onClick={() => props.guestProps(2)}>2</Button>
            <Button onClick={() => props.guestProps(3)}>3</Button>
            <Button onClick={() => props.guestProps(4)}>4</Button>
            <Button onClick={() => props.guestProps(5)}>5</Button>
            <Button onClick={() => props.guestProps(6)}>6</Button>
        </div>
    )
}